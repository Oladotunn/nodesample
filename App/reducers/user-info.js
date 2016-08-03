import _ from 'lodash';
import {
  UPDATE_USER_BIO,
  UPDATE_USER_FLAG,
  UPDATE_USER_LIKE,
  UPDATE_LOOKINGFOR_CRITERIA,
  HYDRATE_USER,
} from '../actions';

const defaultState = {
  bio: {
    text: '',
    name: '',
    birthday: '',
    education: {},
    ethnicity: '',
    occupation: '',
    religion: '',
    likes: [],
  },
  flags: [
    {},
    {},
    {},
  ],
  lookingFor: {
    gender: 'Women',
    minAge: 18,
    maxAge: 22,
    located: 'Houston, TX',
  },
  interests: {
    likes: [
      'Sports',
      'Art',
      'Fitness',
      'Food',
      'Literature',
      'Movies',
      'Theater',
      'Fashion',
      'Technology',
      'Politics',
      'Music',
      'Travel',
      'Video Games',
    ],
    chosenLikes: [],
  }
};

const userInfo = (state = defaultState, action) => {
  const {
    interests,
    flags: oldFlags,
    lookingFor: oldLookingFor
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
      const newFlagState = oldFlags.slice(0);
      newFlagState[action.index] = action.flag;
      return {
        ...state,
        flags: newFlagState, 
      }
    case UPDATE_LOOKINGFOR_CRITERIA: 
      if (!_.has(oldLookingFor,action.criteria)) return state;
      const updateCriteria = {};
      updateCriteria[action.criteria] = action.value;
      return {
        ...state,
        lookingFor: {
          ...oldLookingFor,
          ...updateCriteria,
        }
      }
    case UPDATE_USER_LIKE: 
      const {chosenLikes: oldChosenLikes} = interests;
      const chosenLikes = oldChosenLikes.slice(0);
      if (chosenLikes.includes(action.like)) {
        _.pull(chosenLikes, action.like)
      } else {
        chosenLikes.push(action.like);
      } 
      return {
        ...state,
        interests: {
          ...state.interests,
          chosenLikes,
        }
      }
    case HYDRATE_USER: 
      return action.userAppState
    default: 
      return state;
  }
};

export default userInfo;
