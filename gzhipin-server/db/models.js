/*
操作集合数据的model模块
*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/strawberryYao');

mongoose.connection.on('connected', (err) => {
  if (!err) {
    console.log('db connect success!')
  }
});

// 2.1. 字义Schema(描述文档结构)
const userSchema = mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  type: {type: String, required: true}, // 用户类型: dashen/laoban
  header: {type: String}, // 头像名称
  post: {type: String}, // 职位
  info: {type: String}, // 个人或职位简介
  company: {type: String}, // 公司名称
  salary: {type: String} // 工资
})

const UserModel = mongoose.model('users',userSchema);

exports.UserModel = UserModel;

