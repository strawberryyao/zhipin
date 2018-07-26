
const {ChatModel} = require('../db/models')
module.exports = function (server) {
  const io = require('socket.io')(server);
  //监视浏览器和服务器的连接
  io.on('connection',function(socket){ //socket代表服务器与某个浏览器的连接对象
    console.log('浏览器连接上了');
    socket.on('sendMsg',function ({content,from,to}) {
      console.log('sendMsg',{content,from,to});
      //1.保存到数据库的集合
        const chat_id = from +'_' + to;
        const create_time = Date.now();
        new ChatModel({content,from,to,chat_id,create_time}).save(function (error,chatMsg) {
          //2.全局发送消息给所有连接的浏览器
          io.emit('receiveMsg',chatMsg)
          console.log('receiveMsg', chatMsg);
        })

    })
  })
}