import { combineReducers } from 'redux';
import profilePictures from './reducers/profile-picture';
import facebook from './reducers/facebook';

export default combineReducers({
  facebook,
  profilePictures,
});
