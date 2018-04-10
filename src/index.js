import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import {store} from './reducer/index';
import './App.css';
import Login from './components/admin/login';
import AdminIndex from './components/admin/';
import FrontIndex  from './components/front/index';
import MsgDetails  from './components/front/details';
import PersonCenter from './components/front/person';
import getUserInfo from './components/front/getUserInfo';
import isableToAccess  from './auth/front';
import cookie  from 'react-cookies';
import requireAuth from './auth/front';
import {BrowserRouter as Router,Route,Switch,Redirect,IndexRoute} from 'react-router-dom';
ReactDOM.render(
    <Provider store={store}>
        <Router >
          <Switch>
               <Route exact path="/index/:openid" component={props => requireAuth(FrontIndex, props,"IndexSign")}/>
               <Route exact path="/person/:id"  component={props => requireAuth(PersonCenter, props,"PersonSign")} />
               <Route  path="/msgdetails"  component={MsgDetails}/>
               <Route  path="/admin/login" component={Login}/>
               <Route  path="/admin/index" component={AdminIndex}/>
               <Route  path="/" component={props => requireAuth(FrontIndex, props,"newSign")}/>
               <Redirect to="/" />
           </Switch>
        </Router>
      </Provider>
  , document.getElementById('root'));
