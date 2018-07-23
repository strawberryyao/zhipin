import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, List, InputItem, Button, TextareaItem} from 'antd-mobile'
import {Redirect} from 'react-router-dom';

import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from "../../redux/action";


class BossInfo extends Component {
  state = {
    header: '',
    post: '',
    company: '',
    info: '',
    salary: ''
  };


  handleChange = (name, value) => {

    this.setState({
      [name]: value
    })
  };
  setHeader= (header)=>{
    this.setState({
      header
    })
  };
  save = ()=> {
    this.props.updateUser(this.state);
  };

  //手机用户信息
  render() {
    const {header,type} = this.props.user;
    if(header){
      return <Redirect to ='/boss'/>
    }
    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <List>
          <InputItem onChange={val => this.handleChange('post', val)}>招聘职位:</InputItem>
          <InputItem onChange={val => this.handleChange('company', val)}>公司名称:</InputItem>
          <InputItem onChange={val => this.handleChange('salary', val)}>职位薪资:</InputItem>
          <TextareaItem title='职位要求:' rows={3} onChange={val => this.handleChange('info', val)}/>
          <Button type='primary' onClick = {this.save} >保存</Button>
        </List>

      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(BossInfo);