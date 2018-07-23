/*reducers 函数模块处理stats 生成newState*/

import {combineReducers} from 'redux';  //合并多个reducer
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER
} from "./types";
import {getRedirectTo} from '../utils';

const initState = {
  username: '',
  type: '',
  msg: '',      //返回的错误信息
  redirectTo: ''
};

function user(preState = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const user = action.data;
      return {...user, redirectTo: getRedirectTo( user.type,user.header)};
    case ERROR_MSG:
      const msg = action.data;
      return {...preState, msg};              //将原来的state和返回的错误信息进行合并
    case  RECEIVE_USER:
      return action.data;
    case  RESET_USER:
      return {...initState,msg:action.data};
    default:
      return preState;
  }
}

export default combineReducers({
  user
})