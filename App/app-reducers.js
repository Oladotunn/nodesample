import { combineReducers } from 'redux';
import profilePictures from './reducers/profile-picture';
import facebook from './reducers/facebook';
import userInfo from './reducers/user-info';

export default combineReducers({
  facebook,
  userInfo,
  profilePictures,
});
