// 首先，dto 跟 schema正好一样 （正好）
// 注意这里隐含 一个问题
//

import { IsString } from "class-validator";

export interface IPOST {
  author: String;
  content: String;
  title: String;
}

// 完成注册
export default class PostDTO implements IPOST {
  @IsString()
  author: String;
  @IsString()
  content: String;
  @IsString()
  title: String;
}
