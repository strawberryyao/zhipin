import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar,  InputItem, List, Button, TextareaItem} from 'antd-mobile';
import {Redirect} from 'react-router-dom';

import HeaderSelector from '../../components/header-selector/header-selector';
import {updateUser} from '../../redux/action'

class BigGodInfo extends Component {
  state = {
    header: '',
    post: '',
    info: '',
  };

  setHeader = (header) => {
    this.setState({
      header
    })
  };
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  };

  save = ()=> {
    this.props.updateUser(this.state);
  };
  render() {
    const {header} = this.props.user;
    if(header){
      return <Redirect to ='/biggod'/>
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>

        <List>
          <InputItem onChange={val => this.handleChange('post', val)}>求职岗位</InputItem>
          <TextareaItem title='个人介绍' rows={3} onChange={val => this.handleChange('info', val)}/>
          <Button type='primary' onClick = {this.save} >保存</Button>
        </List>

      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser})
(BigGodInfo)