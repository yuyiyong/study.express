import { PostController } from "./../IPost.controller";
import { IController } from "./../../interface/IController.interface";
// 把控制器放在一起，方便管理
// Using Class Types in Generics -- ts 官网 范型
const controllers: { new (): IController }[] = [PostController];

const routes = controllers.map( c => {
    return new c();
})

export default routes