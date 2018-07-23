import React, {Component} from 'react';
import {List, Grid} from 'antd-mobile';
import PropTypes from 'prop-types';


class HeaderSelector extends Component {
  static propTypes = {
    setHeader: PropTypes.func.isRequired
  };
  state = {
    icon: null
  };

  selectHeader = ({text, icon}) => {
    this.props.setHeader(text);
    this.setState({icon})
  };
  constructor(props) {
    super(props);
    //避免重复渲染
    this.headerList = [];
    for (let i = 0; i < 20; i++) {
      const text = '头像' + (i + 1);
      this.headerList.push({
          text,
          icon: require(`../../assets/images/headers/${text}.png`)
        }
      )
    }
  }

  render() {
    const {icon} = this.state;
//
    const header = icon ? <span>已选择头像:<img src={icon}/></span> : '请选择头像';
    return (
      <List renderHeader={() => header}>
        <Grid columnNum={5}
              onClick={this.selectHeader}
              data={this.headerList}/>
      </List>
    )
  }
}

export default HeaderSelector;