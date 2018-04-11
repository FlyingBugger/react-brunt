//reducer
import { combineReducers,createStore } from 'redux';
import {appState} from './app';
import {loginReducer} from './loginState';
import {appDates} from './appdates';
const reducer=combineReducers({
  appDates,
  appState,
  loginReducer
})
export let store=createStore(reducer);




// 停止监听 state 更新
