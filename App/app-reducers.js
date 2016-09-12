import { combineReducers } from 'redux';
import profilePictures from './reducers/profile-picture';
import facebook from './reducers/facebook';
import userInfo from './reducers/user-info';

const React = require('react-native');

const config = {
  development: {
    // server: 'http://localhost:3030',
    server: 'http://tribl-83401.onmodulus.net',
  },
  production: {
    server: 'http://tribl-83401.onmodulus.net',
  }
};

const websocketUrl = config[process.env.NODE_ENV || 'development'].server.replace('http', 'ws');
const ws = new WebSocket(websocketUrl);

ws.onopen = e => {
  console.log('socket connected!');
};

ws.onmessage = e => {
  console.log(e.data);
};

ws.onerror = (e) => {
  // an error occurred
  console.log(e.message);
};
  
ws.onclose = (e) => {
  console.log(e.code, e.reason);
};

export { ws };

const appConfig = () => {
  return config[process.env.NODE_ENV || 'development'];
};

export default combineReducers({
  facebook,
  userInfo,
  profilePictures,
  appConfig,
});

