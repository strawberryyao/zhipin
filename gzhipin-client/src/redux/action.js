/*
 包含所有的action creator 函数的模块
*/
/*
1.生成action
2.发送请求
3.分发action
*/
import io from 'socket.io-client'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST
} from "./types";
import {reqRegister, reqLogin, reqUpdateUser, reqUser,reqUserList} from '../api';

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});

const receiveUser = (user) => ({type: RECEIVE_USER, data: user});
export const resetUser = (msg) => ({type: RESET_USER, data: msg});

// 接收用户列表的同步action
const receiveUserList = (userList) => ({type:RECEIVE_USER_LIST, data: userList});


/*进行前台的表单验证然后发送请求，减少请求数量*/

//异步注册
export function register(user) {
  const {username, password, password2, type} = user;
  if (!username) {
    return errorMsg('必须指定用户名')
  } else if (!password) {
    return errorMsg('请输入密码')
  } else if (password !== password2) {
    return errorMsg('两次密码必须一致!')
  } else if (!type) {
    return errorMsg('必须指定用用户类型')
  }
  /* if((!username || !password || !type) && password !== password2 ){
     return errorMsg('请输入用户名或密码')
   }*/
  return async dispatch => {
    //发送请求拿到响应数据
    const response = await reqRegister({username, password, type});
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

//异步登录
export function login(user) {
  const {username, password} = user;

  /*if(!username || !password){
    return errorMsg('请输入用户名或密码')
  }*/
  return async dispatch => {
    if (!username) {
      dispatch(errorMsg('必须指定用户名'));
      return
    } else if (!password) {
      dispatch(errorMsg('必须指定用密码'));
      return
    }
    //发送请求拿到响应数据
    const response = await reqLogin(username, password);
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

/*
获取当前用户的异步action
 */
export function getUser() {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}


//
export function updateUser(user) {
  return async dispatch => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}
//获取指定用户列表的异步action
export function getUserList(type) {
  return async dispatch => {
    const response = await reqUserList(type);
    const result = response.data;
    if(result.code===0) {
      dispatch(receiveUserList(result.data))
    }
  }
}

//连接服务器，得到连接代表socket对象
 const socket = io('ws://localhost:4000');

export function sendMessage({content,from,to}) {

  return dispatch => {
    //向服务器发送消息消息名:sendMsg , 数据:{}
    socket.emit('sendMsg',{content,from,to})
    //绑定接收服务器发送消息的监听
    socket.on('receiveMsg',chatMsg => {
      console.log('receiveMsg', chatMsg);
    })
  }


}