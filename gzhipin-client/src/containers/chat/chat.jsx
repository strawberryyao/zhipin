import React,{Component} from 'react';
import {connect} from 'react-redux'
import {NavBar,List,InputItem} from 'antd-mobile';

import {sendMessage} from '../../redux/action';
const Item = List.Item;

class Chat extends Component{
  state = {
    content:''
  };
  send =() => {
    //通过socketio向服务器发送信息
    const {content} = this.state;
    const to = this.props.match.params.userid;
    const from = this.props.user._id;
    this.props.sendMessage({content,to,from})
  }
  render(){
    const targetId = this.props.match.params.userid;
      return (
        <div id='chat-page'>
          <NavBar>{targetId}</NavBar>
          <List>
            <Item
              thumb={require('../../assets/images/headers/头像1.png')}
            >
              你好
            </Item>
            <Item
              thumb={require('../../assets/images/headers/头像1.png')}
            >
              你好2
            </Item>
            <Item
              className='chat-me'
              extra='我'
            >
              很好
            </Item>
            <Item
              className='chat-me'
              extra='我'
            >
              很好2
            </Item>
          </List>

          <div className='am-tab-bar'>
            <InputItem
              placeholder="请输入"
              onChange ={ val => this.setState({content:val})}
              extra={
                <span onClick={this.send}>发送</span>
              }

            />
          </div>
        </div>
      )
    }
  }

export default connect(
  state => ({user:state.user}),
  {sendMessage}
)(Chat);