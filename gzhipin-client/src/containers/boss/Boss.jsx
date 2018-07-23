import React,{Component} from 'react';
import {connect} from 'react-redux';

class Boss extends Component{
  render() {
    return(
      <div>老板详情页</div>
    )
  }
}
export default connect(
  state => ({}),
  {}
)(Boss);