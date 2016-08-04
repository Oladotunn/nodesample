import _ from 'lodash';
import {
  UPDATE_FB_TOKEN,
  UPDATE_FB_CREDS,
  UPDATE_FB_READY,
  HYDRATE_FB,
} from '../actions';

const defaultState = {
  ready: false,
  credentials: {}
};

const facebook = (state = defaultState, action) => {
  const {
    credentials,
  } = state;

  switch(action.type) {
    case UPDATE_FB_CREDS: 
      return {
        ...state,
        credentials: action.credentials,
      };
    case UPDATE_FB_READY: 
      return {
        ...state,
        ready: action.state,
      };
    case HYDRATE_FB: 
      return action.userAppState;
    default: 
      return state;
  }
};

export default facebook;
