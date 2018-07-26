/*入口界面*/

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Login from './containers/login/login';
import Register from './containers/register/register';
import Main from './containers/main/main';
import store from './redux/store';

//测试聊天接口
//import './test/socketio_test'

import './assets/css/index.less'

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/' component={Main}/>
      </Switch>
    </HashRouter>
  </Provider>
),document.getElementById('root'));