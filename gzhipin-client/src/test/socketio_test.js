// 引入客户端io
import io from 'socket.io-client'

// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:4000');   //会导致服务器端的connection的监听回调被调用

//接收和法案送消息类型和名称都要和服务器的一一对应
// 绑定'receiveMessage'的监听, 来接收服务器发送的消息
socket.on('receiveMsg', function (data) {
  console.log('浏览器端接收到消息:', data)
})

// 向服务器发送消息
//会使服务器监听的‘sendMsg'的回调被调用
socket.emit('sendMsg', {name: 'Tom', date: Date.now()});
console.log('浏览器端向服务器发送消息:', {name: 'Tom', date: Date.now()});