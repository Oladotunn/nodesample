import { combineReducers } from 'redux';
import profilePictures from './reducers/profile-picture';
import facebook from './reducers/facebook';
import userInfo from './reducers/user-info';

const React = require('react-native');
window.navigator.userAgent = "react-native";
const io = require('socket.io-client/socket.io');
const socketIo = () => {
  return io('http://localhost:3000', {
    transports: ['websocket']
  });
};

export default combineReducers({
  facebook,
  userInfo,
  profilePictures,
  socketIo,
});
