import { App } from "./App";
import routes from "./controllers/routes/routes";
// 类似
//  过程: Server => App => IController => Controller
import "dotenv/config"; // 越早配置越好 在serve app

const server = new App(3000, routes);
// const { MONGO_USER, MONGO_PWD, MONGO_PATH } = process.env;
// console.log("process-", MONGO_USER, MONGO_PWD, MONGO_PATH);
