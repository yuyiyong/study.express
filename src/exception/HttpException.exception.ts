export class HttpException extends Error {
  public message: string;
  public status: number;
  constructor(m: string = "发生了一些错误", s: number = 400) {
    super();
    this.message = m;
    this.status = s;
  }
}
