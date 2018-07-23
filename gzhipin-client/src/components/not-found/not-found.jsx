import React,{Component} from 'react';
import {Button} from 'antd-mobile';



class NotFound extends Component{
  render() {
    return(
      <div>
        <p className='404'>没有您要找的啦！！！</p>
        <Button type='primary' onClick = {() =>this.props.history.replace('/')}>回到首页</Button>
      </div>

    )
  }
}
export default NotFound;