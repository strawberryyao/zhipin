import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';    //将一般组件包装成路由组件


class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render() {
    //过滤hide为true的
    const navList = this.props.navList.filter(nav => !nav.hide)
    const path = this.props.location.pathname;
    return (
      <TabBar>
        {
          navList.map(nav => (
            <TabBar.Item key={nav.path}
                         title={nav.text}
                         icon={{uri: require(`./images/nav/${nav.icon}.png`)}}
                         selectedIcon={{uri: require(`./images/nav/${nav.icon}-selected.png`)}}
                         selected={nav.path === path}
                         onPress ={() =>this.props.history.replace(nav.path)}
            />


          ))
        }
      </TabBar>

    )
  }
}

//withRouter 可以向一般组件中传递history/match/location 等路由组件才能使用的相关属性
export default withRouter(NavFooter);