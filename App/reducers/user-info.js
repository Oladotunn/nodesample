import _ from 'lodash';
import {
  UPDATE_USER_BIO,
  UPDATE_USER_FLAG,
  HYDRATE_USER,
} from '../actions';

const defaultState = {
  bio: {
    text: '',
    name: '',
    birthday: '',
    education: {},
  },
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
        bio: {
          ...state.bio,
          ...action.bio,
        }
      }
    case UPDATE_USER_FLAG: 
      const newFlagWithRemainingItems = oldFlags.slice(action.index + 1).splice(0,action.flag);
      const newFlagState = _.union(
        ...oldFlags.slice(0, action.index),
        ...newFlagWithRemainingItems
      );
      return {
        ...state,
        flags: newFlagState, 
      }
    case HYDRATE_USER: 
      return action.userAppState
    default: 
      return state;
  }
};

export default userInfo;
