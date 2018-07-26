import React,{Component} from 'react';
import {connect} from 'react-redux';

import UserList from '../../components/user-list/user-list';
import {getUserList} from "../../redux/action";

class BigGod extends Component{

  componentDidMount() {
    this.props.getUserList('Boss')
  }

  render() {
    return(
      <UserList userList = {this.props.userList}/>
    )
  }
}
export default connect(
  state => ({userList:state.userList}),
  {getUserList}
)(BigGod);