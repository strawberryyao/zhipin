/*包含了n个请求函数的模块
* 每个函数都对应一个接口
* 每个函数的返回值都是promise对象*/

import ajax from './ajax';
const BASE = '';
export const reqRegister =({username,password,type}) => ajax(BASE + '/register',{username,password,type},'POST');
export const reqLogin = (username,password) => ajax(BASE +'/login',{username,password},'POST');
export const reqUpdateUser = (user) => ajax(BASE +'/update',user,'POST');
export const reqUser = () => ajax(BASE + '/user');
/*
发送请求时注意传入参数的个数，调用时也要传一样个数的参数
*/

