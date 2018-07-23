/*注册的路由*/

import React,{Component} from 'react';
import {NavBar,InputItem,Button,WhiteSpace,WingBlank,List,Radio} from 'antd-mobile'
import Logo from '../../components/logo/logo';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/action'
/*//测试
import {reqRegister} from '../api'*/

const Item = List.Item;

class Register extends Component{
  state = {
    username:'',
    password:'',
    password2:'',
    type:'BigGod'
  };
  //收集用户输入的数据 第一个参数为这个参数的值而不是name这个变量本身
handleChange = (name,val)=>{
  this.setState({
    [name]:val
  })
};
register=()=>{
  console.log(this.state);
  /*reqRegister(this.state).then(response => {
    const result = response.data;
    if(result.code === 0) {
      alert('注册成功')
    }else{
      alert(result.msg);
    }
  },err=>{
    console.log(err);
  })*/

    this.props.register(this.state);

};
goLogin=()=>{
  this.props.history.replace('/login')
};
  render() {

  const{type} = this.state;
  const {msg,redirectTo} = this.props.user;//msg undefined

  if(redirectTo){
    //debugger;
    return <Redirect to = {redirectTo}/>
  }
    return(
      <div>
        <NavBar>用户注册</NavBar>
        <Logo/>
        <WingBlank size='sm'>

          <List>
            <WhiteSpace/>
            {msg ? <p className='err-msg'>{msg}</p> : null}
            <InputItem placeholder='请输入用户名' onChange={val=>this.handleChange('username',val)}>用户名:</InputItem>
            <InputItem type='password' placeholder='请输入密码' onChange={val=>this.handleChange('password',val)}>密&nbsp;&nbsp;码:</InputItem>
            <InputItem clear={true} type='password2' placeholder='请确认密码' onChange={val=>this.handleChange('password2',val)}>确认密码:</InputItem>
            <WhiteSpace/>
            <Item>
              <span>用户类型:</span>&nbsp;
              <Radio checked={type === 'Boss'}  onChange={()=>this.handleChange('type','Boss')}>Boss&nbsp;</Radio>&nbsp;&nbsp;
              <Radio checked={type === 'BigGod'}  onChange={()=>this.handleChange('type','BigGod')}>BigGod</Radio>
            </Item>
            <WhiteSpace/>
            <Button type= 'primary'  onClick={this.register}>注&nbsp;&nbsp;册</Button>
            <WhiteSpace/>
            <Button  onClick={this.goLogin} >已有账户</Button>
            <WhiteSpace/>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {register}
)(Register)