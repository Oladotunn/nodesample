import _ from 'lodash';
import {
  UPDATE_USER_BIO,
  UPDATE_USER_FLAG,
} from '../actions';

const defaultState = {
  bio: '',
  flags: [],
};

const userInfo = (state = defaultState, action) => {
  const {
    flags: oldFlags
  } = state;

  switch(action.type) {
    case UPDATE_USER_BIO: 
      return {
        ...state,
        bio: action.bio
      }
    case UPDATE_USER_FLAG: 
      return {
        ...state,
        flags: _.union(oldFlags, [action.flag]) 
      }
    default: 
      return state;
  }
};

export default userInfo;
