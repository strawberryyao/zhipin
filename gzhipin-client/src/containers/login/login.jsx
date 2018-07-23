/*登录的路由*/

import React, {Component} from 'react';
import {NavBar, InputItem, Button, WhiteSpace, WingBlank, List} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/action'
import Logo from '../../components/logo/logo'


class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange(name, val) {
    this.setState({
      [name]: val
    })
  }
  login = () => {
    console.log(this.state);
    //分发同步的action
    this.props.login(this.state);
    /*等价于
    function login(user){
      return dispatch(login(user))
    }*/
  };
  goRegister = () => {
    this.props.history.replace('/register')
  };

  render() {
    const {msg,redirectTo} = this.props.user;
    if(redirectTo){
      return <Redirect to = {redirectTo}/>
    }
    return (
      <div>
        <NavBar>用户登录</NavBar>
        <Logo/>
        <WingBlank size='sm'>
          <List>
            {msg ? <p className='err-msg'>{msg}</p> : null}
            <WhiteSpace/>

            <InputItem placeholder='请输入用户名' onChange={val => this.handleChange('username', val)}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码'
                       onChange={val => this.handleChange('password', val)}>密码:</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;录</Button>
            <WhiteSpace/>
            <Button onClick={this.goRegister}>还没有账户</Button>
            <WhiteSpace/>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state =>({user:state.user}),
  {login}
)(Login);