import React,{Component} from 'react';
import {connect} from 'react-redux';

class BigGod extends Component{
  render() {
    return(
      <div>大神详情页</div>
    )
  }
}
export default connect(
  state => ({}),
  {}
)(BigGod);