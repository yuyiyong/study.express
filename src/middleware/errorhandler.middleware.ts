import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "服务器发生一些错误...";
  res.status(status).send({ status, message });
};

export default errorHandler;
