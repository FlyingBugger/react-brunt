import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './reducer/index';
import './App.css';
import Login from './components/admin/login';
import AdminIndex from './components/admin/';
import FrontIndex  from './components/front/index';
import MsgDetails  from './components/front/details';
import ListAll  from './components/front/list';
import ListDetails  from './components/front/listDetails';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
ReactDOM.render(
    <Provider store={store}>
        <Router basename="/jbpt">
          <Switch>
               <Route exact path="/index" component={FrontIndex}/>
               <Route  path="/admin/login" component={Login}/>
               <Route  path="/list" component={ListAll}/>
               <Route  path="/listDetails" component={ListDetails}/>
               <Route  path="/admin/index" component={AdminIndex}/>
                <Route  path="*" component={FrontIndex}/>
           </Switch>
        </Router>
      </Provider>
  , document.getElementById('root'));
