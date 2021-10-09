const express = require("express");

const app = express();

app.use(m1);

// 著录有
app.get("/main", (req, res, next) => {
  // 这里处理业务逻辑, 一般人们（简单的应用中）
  // 比如
  if (req.query.test === "demo") {
    console.log("被m1处理了", req);
    res.send("查询字符串test=demo");
    return;
  }

  res.send("这是一个由主陆游中get请求的响应内容");
});

app.listen("3000", () => {
  console.log("监听3000---");
});

// 挂载子陆游到主陆游

const childRouter1 = express.Router();

childRouter1.get("/child1", (req, res) => {
  res.send("这是一个子陆游中的get请求的响应内容");
});

app.use("/api", childRouter1);

function m1(req, res, next) {
  if (req.query.test === "demo") {
    res.test = "666";
    next();
  }
}

// ts
// import * as express from 'express';

// // 服务器实例

// const app = express();

// // 著录有
// app.get("/main",(req,res,next)=>{
//     // 这里处理业务逻辑, 一般人们（简单的应用中）
//     // 比如
//     if(req.query.test="demo"){
//         res.send("查询字符串test=demo")
//     }

//     res.send("这是一个由主陆游中get请求的响应内容");
// })
