import { combineReducers } from 'redux';
import profilePictures from './reducers/profile-picture';
import facebook from './reducers/facebook';
import userInfo from './reducers/user-info';

const React = require('react-native');

const ws = new WebSocket('ws://10.1.10.48:3030');

ws.onopen = e => {
  console.log('connected!');
  ws.send('message', { i: 'some'});
};

ws.onmessage = e => {
  console.log(e.data);
};

ws.onerror = (e) => {
  // an error occurred
  console.log(e.message);
};
  
ws.onclose = (e) => {
  console.log('closed here')
  console.log(e.code, e.reason);
};

const triblSocket = () => {
  return {
    ws,
  }
};

export default combineReducers({
  facebook,
  userInfo,
  profilePictures,
  triblSocket,
});
