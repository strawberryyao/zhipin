/*主界面的路由*/

import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import Cookies from 'js-cookie';    //前台读取cookie


import BossInfo from '../boss-info/boss-info';
import BigGodInfo from '../biggod-info/biggod-info';
import BigGod from '../biggod/bigGod';
import Boss from '../boss/Boss';
import Message from '../message/Message';
import Personal from '../personal/Personal';
import NavFooter from '../../components/nav-footer/nav-footer';
import {getRedirectTo} from '../../utils';
import {getUser} from '../../redux/action';
import NotFound from '../../components/not-found/not-found';

class Main extends Component{
  //给组件对象添加的属性，通过this.navList
  navList = [
    {
      path: '/boss', // 路由路径
      component: Boss,
      title: '大神列表',
      icon: 'dashen',
      text: 'BigGod',
    },
    {
      path: '/biggod', // 路由路径
      component: BigGod,
      title: '老板列表',
      icon: 'laoban',
      text: 'Boss',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: 'Message',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: 'Personal',
    }
  ];
  componentDidMount(){
    //当前没有登录但是之前已经登录过，发送请求来获取user信息
    const userid = Cookies.get('userid');
    const id = this.props.user._id;    //state中的id
    if(!id && userid){
      this.props.getUser();
    }
  }
  render() {
    const userid = Cookies.get('userid');
    if(!userid) {
      return <Redirect to='/login'/>
    }
      //如果登陆过,需要发送请求获取当前的user信息(render 中不能发送)
      const {user} = this.props;
      if(!user._id){
        return null
      }


    //获得当前的请求路径
    const path = this.props.location.pathname;
      //请求的是根路径的情况
    if(path==='/') {
      return <Redirect to={getRedirectTo(user.type, user.header)}/>
    }
    //通过遍历数组，如果请求的路径是数组其中的一个，就显示头部的导航否则就隐藏
    //通过数组的find()方法会返回第一个符合条件的
    const currentNav = this.navList.find((nav) => {
     // console.log( nav);
      return path === nav.path;
    });

    //根据用户类型决定隐藏哪个nav
    const {navList} = this;
    if(user.type==='BigGod'){
      navList[0].hide = true ;
    }else{
      navList[1].hide = true;
    }

    return(
      <div>
        {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/biggodinfo' component={BigGodInfo}/>
          <Route path='/biggod' component={BigGod}/>
          <Route path='/boss' component={Boss}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>
          <Route component={NotFound}/>

        </Switch>
        {currentNav ? <NavFooter navList = {navList}/> : null}
      </div>
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {getUser}
)(Main);
/*
* 1.如果从来没有登录过(cookie中没有userid)，自动跳转到login:使用工具包(js-cookie)
* 2.登录过(cookie中有userid)，但当前没有登录(state.user._id没有)需要实现自动登录(发请求获取当前user)
* 3.如果你已经登录，请求的是根路径:'/',自动跳转到对应的路由(getRedirectTo());
* */