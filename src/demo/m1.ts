import { Request, Response, NextFunction as NF } from "express";

function m1(req: Request, res: Response, next: NF) {
    // 这就是中间件
    // 一般在中间件里，我们获取req上的信息， 进行处理和判断， 把附加信息添加到req对象上，继续交给下一个中间件
    // 注意next next（）的形式可以把数据的处理权利交给下一个中间件
    // 但是next(“随便穿一个参数”)，就能把数据的处理权利交给错误处理中间件 


}
