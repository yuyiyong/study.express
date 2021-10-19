import  mongoose from "mongoose";

const schema = new mongoose.Schema({
  auther: String,
  content: { type: String, required: true },
  title: { type: String, unique: true },
});

// const schema = new mongoose.Schema({
//   auther: String,
//   content: String,
//   title: String,
// });

// 用创建好的schema传入 下面的函数 生产的model就能用于操作MongoDB

// 下面函数的参数1和2 分别是这类数据的名称，如发帖Post 的梯子存在数据库中的很多数据形成的集合（collection）
// 第二个参数就是schema的参数
const PostModel = mongoose.model("POST", schema);
export default PostModel;
