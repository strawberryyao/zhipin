/*
 包含所有的action creator 函数的模块
*/
/*
1.生成action
2.发送请求
3.分发action
*/

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER
} from "./types";
import {reqRegister, reqLogin,reqUpdateUser,reqUser} from '../api';

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});

const receiveUser = (user) => ({type:RECEIVE_USER,data:user});
export const resetUser = (msg) => ({type:RESET_USER,data:msg});


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
export function getUser () {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data;
    if(result.code===0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}


//
export function updateUser(user) {
return async dispatch =>{
  const response = await reqUpdateUser(user);
  const result = response.data;
  if(result === 0){
    dispatch(receiveUser(result.data))
  }else{
    dispatch( resetUser(result.msg))
  }
}
}


