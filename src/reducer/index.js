//reducer
import { combineReducers,createStore } from 'redux';
import {appState} from './app';
import {loginReducer} from './loginState';

const reducer=combineReducers({
  appState,
  loginReducer
})
export let store=createStore(reducer);




// 停止监听 state 更新
