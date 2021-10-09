import { IController } from "./../interface/IController.interface";
import { Router, Request, Response, NextFunction as NF } from "express";
import { AController } from "../abstract/AController.abstract";
import PostModel from "../model/Post.model";
// 做为示范的post控制器

export class PostController extends AController implements IController {
  // 是public （公共接口） 类型是express.Router
  // 我还想约束这个path，或许用抽象类更好
  // 抽象类中的protected 字段也是可以被继承的
  // 这个累对外暴露了一个router接口供app使用
  // 内部自己有应对特定的api endpoint （比如 xxx.yyy.zzz/api/v3/posts）的逻辑

  public router: Router;
  protected path = "/posts";

  public id: number;
  constructor() {
    super();
    this.router = Router();
    this.attachToRoutes();
  }
  //http://localhost:3000/api/posts
  private attachToRoutes() {
    const path = this.path;
    this.router.get(path, this.getPosts);
    this.router.post(`${path}/add`, this.addPost);
    this.router.delete(`${path}/delete/:id`, this.deletePostById);
    this.router.put(`${path}/update/:id`, this.updatePost);
    this.router.get(`${path}/get/:id`, this.getPostById);
  }
  // 这是一个示例接口，装作返回很多帖子的
  private getPosts(req: Request, res: Response, next: NF) {
    res.send("ts-node-dev 是一个可以直接运行TYpeScript应用 all post!!");
  }

  // 增加
  private async addPost(req: Request, res: Response, next: NF) {
    console.log("---req---", req.body);

    const data = req.body;
    try {
      // const bag = new PostModel({ ...data });
      // console.log("bag---", bag);
      // bag.save((err, fluffy) => {
      //   console.log("err--", err);
      //   console.log("fluffy--", fluffy);
      //   res.send(fluffy);
      // });
      const result = await PostModel.create(req.body);
      if (result) {
        res.send(result);
      } else {
        throw new Error("发生错误");
      }
    } catch (error) {
      console.log("error---", error);
      next(error);
      // throw new Error(error);
      // next(error);
    }
    // const data = req.body;
    // PostModel.create({ data })
    //   .then((result) => {
    //     console.log("result----", result);

    //     res.send(result);
    //   })
    //   .catch((err) => {
    //     res.send(err);
    //     console.log("err----", err);
    //   });
    // console.log("nimamawoyuan");
  }
  // 删除
  private async deletePostById(req: Request, res: Response, next: NF) {
    const id = req.params.id;
    try {
      const result = await PostModel.findByIdAndDelete(id);
      res.send(result);
    } catch (error) {
      throw new Error("找不到id或者是删除失效");
    }
  }
  // 修改
  // private async updatePost(req: Request, res: Response, next: NF) {
  //   const id = req.params.id;
  //   const data = req.body;
  //   console.log("id--", id, "   data--", data);

  //   try {
  //     const result = await PostModel.findByIdAndUpdate(id, data);
  //     if (result) {
  //       res.send(result);
  //     } else {
  //     }
  //   } catch (error) {
  //     throw new Error("error");
  //   }
  // }
  private updatePost(req: Request, res: Response, next: NF) {
    const id = req.params.id;
    const data = req.body;
    console.log("id--", id, "   data--", data);

    PostModel.findByIdAndUpdate(id, data)
      .then((result) => {
        if (result) {
          res.send(result);
        } else {
        }
      })
      .catch((err) => next(err));
  }

  // 查询
  private async getPostById(req: Request, res: Response, next: NF) {
    const id = req.params.id;
    const result = await PostModel.findById(id);
    if (result) {
      res.send(result);
    } else {
      throw new Error("无法更新或者其他异常");
    }
  }
}
