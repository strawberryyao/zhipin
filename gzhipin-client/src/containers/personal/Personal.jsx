/*
用户个人中心路由组件
 */

import React from 'react'
import {Modal, Result, List, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';

import {resetUser} from "../../redux/action";

const alert = Modal.alert;

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends React.Component {
  exit = () => {
    alert('exit', 'Are you sure?', [
      {text: 'Cancel', onPress: () => console.log('cancel')},
      {
        text: 'Ok', onPress: () => {
          //清除cookie
          Cookies.remove('userid');
          //  重置用户信息
          this.props.resetUser();
        }
      },
    ])
  };

  render() {
    const {username, header, post, info, company, salary} = this.props.user;
    return (
      <div>
        <Result
          img={<img src={require(`../../assets/images/headers/${header}.png`)} style={{width: 50}} alt="header"/>}
          title={username}
          message={company}
        />

        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位:{post}</Brief>
            <Brief>简介: {info}</Brief>
            {salary ? <Brief>薪资:{salary}</Brief> : null}

          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.exit}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal);