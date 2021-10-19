// 类似 const server = new App();

import  express from "express";
import { Application } from "express";
import { IController } from "./interface/IController.interface";
import  mongoose from "mongoose";
import errorHandler from "./middleware/errorhandler.middleware";
export class App {
  // 端口 + web 服务器实例
  //
  private port: number;
  // Application 也就是web服务的实例

  private app: Application;
  // 这个类应该在实例化的时候接受Controller 相当于把各子路由器添加到app实例上
  constructor(port: number, controllers: IController[]) {
    this.port = port;
    this.app = express();
    this.connectToMongoDB();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    // 注意,错误处理应该放在所有中间件后面
    this.initializeErrorHandling();
    this.startListen();
  }
  initializeErrorHandling() {
    this.app.use(errorHandler);
  }
  // express 应用 要用到很多中间件，
  private initializeMiddleware() {
    // express.json 是 express 4.13版本以后提供的一个内嵌中间件
    // 原来得用bodyParser
    // 有了这个，就能处理json数据了
    this.app.use(express.json());
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((c) => {
      this.app.use("/api", c.router);
    });
  }

  private startListen() {
    const port = this.port;
    this.app.listen(port, () => {
      console.log(`正在监听${port}端口`);
    });
  }
  // 考虑在app中加个链接数据库的方法
  private async connectToMongoDB() {
    // 这一步要输入用户名密码等内容
    // 这样的内容应该报名，使用.env 和 dotenv 来完成
    // 数据库的地址就是一个网址，具体格式会有很多种， 我这是这样的：
    // *mongodb://用户名:密码@localhost:27017/test
    /* 
     用户名密码自选的，test是因为数据库中保存抹一些数据的一块地方就叫test(自取)
     27017MongoDB默认运行端口

    */
    /**
     * !注意 下面的操作时示范，实际开发中不能用用户名和密码等信息，或者说，这些信息不能保存到代码库中！
     *
     * *jijiji
     * ? 哈哈
     * todo 你好
     */
    // TODO:1231231
    const { MONGO_USER, MONGO_PWD, MONGO_PATH } = process.env;
    const dbUrl = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_PATH}`;
    mongoose.connect(dbUrl);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function () {
      console.log("链接成功");
    });

    // !以下几条路是错的
    // 1. 在中间件中检测数据库连接，那如果峰用户是很大的书，那么资源消耗就很大
    // 2. 检测应该是一个循环的操作， 为了减少和数据库的多余的（用于检测的）连接，一定要进行监测链接的关闭
    // 不要直接在mongoose.connection 上操作，这是单例变量

    // 5秒检测一次 数据库宕机
    setInterval(async () => {
      try {
        const conn = await mongoose.createConnection(dbUrl).asPromise();
        conn.close();
      } catch (error) {
        // throw new Error("检测到数据库连接失败");
        console.log("数据库已经宕机，联系管理员...");
        mongoose.disconnect();

        this.app._router = null;
        // app.ll 能接受所有（HTTP verb）类型的请求
        this.app.all("*", (req, res, next) => {
          console.log("路由都被清空，现在呗宕机提示路由接管，请速速联系管理员");
          res.send({ error: "数据库宕机" });
        });
      }
    }, 5000);
  }
}
