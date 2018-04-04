import React from 'react';
import { Router,Route  } from 'react-router-dom'

import Login from '../components/front/login';

export default class RouterPath extends  React.Component {
  render(){
    return(
      <Router>
        <Route exact path="/" component={Login}/>
      </Router>
    )
  }
};
