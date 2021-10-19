import { HttpException } from './../exception/HttpException.exception';
import { RequestHandler, Request, Response, NextFunction as NF } from "express";
// 我要传个dto 还有一些选项，写个高阶函数，返回一个中间件
// 当然首先安装 class-validator 和 class-transformer 因为我已经
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
// 传一些参数 比如DTO模版（类），还有class-validator的验证选项 => 只能用高阶函数

export default function validateDTOMiddleware(dto: any): RequestHandler {
  return (req: Request, res: Response, next: NF) => {
    // 验证
    // 接受两个参数， DTO模版类， 一个是实际传输的dto
    validate(plainToClass(dto, req.body)).then((errors) => {
      console.log("req.body----", req.body);
      console.log("dto----", dto);

      if (errors.length > 0) {
        console.log("validation failed. errors: ", errors);
        // 如果有错误，就给错误处理中间件
        const errorsString = errors
          .map((err) => {
            return Object.values(err.constraints);
          })
          .join(",");
        console.log("errorsArr---", errorsString);

        next(new HttpException(errorsString,403)); //ValidationError[]
        //
      } else {
        console.log("validation succeed");
        next();
      }
    });
  };
}
