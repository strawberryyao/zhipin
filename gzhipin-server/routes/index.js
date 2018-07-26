const express = require('express');
const router = express.Router();
const {UserModel} = require('../db/models');

const md5 = require('blueimp-md5');
const filter = {password: 0, __v: 0}; // 查询的过滤(去除文档中的指定属性)
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/*注册用户注册的接口*/
router.post('/register', function (req, res) {
  const {username, password, type} = req.body;
  res.setHeader('Access-Control-Allow-Origin',['http://localhost:3000'])
  UserModel.findOne({username}, (err, user) => {
    if (user) {
      res.send({
        "code": 1,
        "msg": "此用户已存在"
      })
    } else {
      //说明用户未注册，将信息保存到集合当中
      new UserModel({username, password: md5(password), type}).save((err, user) => {
        // 向浏览器返回一个userid的cookie
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24 * 7})
        res.send({
          "code": 0,
          "data": {username, type, _id: user._id}
        })
      })
    }
  })

});

/*登录用户登录的接口*/
router.post('/login', function (req, res) {

  const {username, password} = req.body;
  UserModel.findOne({username, password: md5(password)}, filter, (err, user) => {
    if (user) {
      // 向浏览器返回一个userid的cookie
      res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24 * 7})
      res.send({
        "code": 0,
        "data": user
      })
    } else {
      res.send({
        "code": 1,
        "msg": "用户名或密码错误"
      })
    }
  })
});

/*更新数据的接口*/
router.post('/update',function (req,res) {
  //得到请求cookie的userid
  const userid = req.cookies.userid;
  //接受请求的cookie中如果有userid 表示用户已经登录，没有则提示必须先登录
  if(!userid){
    return res.send({code:1,msg:'请先登录'})
  }
  //将请求到的数据更新到数据库中
  UserModel.findByIdAndUpdate({_id:userid},req.body,function (err,user) {
    const {_id,username,type} = user;   //将req.body 缺的数据结构出来 从之前的user中结构出来合并到新的对象中
    const data = Object.assign(req.body,{_id,username,type});
    res.send({code:0,data});
  })
});

// 根据cookie获取对应的user
router.get('/user', function (req, res) {
  // 取出cookie中的userid
  const userid = req.cookies.userid;
  if(!userid) {
    return res.send({code: 1, msg: '请先登陆'})
  }

  // 查询对应的user
  UserModel.findOne({_id: userid}, filter, function (err, user) {
    return res.send({code: 0, data: user})
  })
});


//查看用户列表
router.get('/userlist',function(req, res){
  const { type } = req.query;
  UserModel.find({type},function(err,users){
    return res.json({code:0, data: users})
  })
});


//获取当前用户所有相关聊天信息列表
router.get('/msglist', function (req, res) {
  // 获取cookie中的userid
  const userid = req.cookies.userid
  // 查询得到所有user文档数组
  UserModel.find(function (err, userDocs) {
    // 用对象存储所有user信息: key为user的_id, val为name和header组成的user对象
    const users = {} // 对象容器
    userDocs.forEach(doc => {
      users[doc._id] = {username: doc.username, header: doc.header}
    })
    /*
    查询userid相关的所有聊天信息
     参数1: 查询条件
     参数2: 过滤条件
     参数3: 回调函数
    */
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
      // 返回包含所有用户和当前用户相关的所有聊天消息的数据
      // res.send({code: 0, data: {users, chatMsgs}}) // 如果传递的是{}/[]内部就会调用json()
      res.json({code: 0, data: {users, chatMsgs}})
    })
  })
});


//修改指定消息为已读
router.post('/readmsg', function (req, res) {
  // 得到请求中的from和to
  const from = req.body.from
  const to = req.cookies.userid
  /*
  更新数据库中的chat数据
  参数1: 查询条件
  参数2: 更新为指定的数据对象
  参数3: 是否1次更新多条, 默认只更新一条
  参数4: 更新完成的回调函数
   */
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
    console.log('/readmsg', doc)
    res.send({code: 0, data: doc.nModified}) // 更新的数量
  })
})

module.exports = router;
