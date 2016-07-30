import {
  ADD_PROFILE_PICTURE,
  DELETE_PROFILE_PICTURE,
  INIT_PROFILE_PICTURES,
  HYDRATE_PROFILE_PICTURES,
  UPDATE_PROFILE_PICTURE_ALBUM_DETAILS,
} from '../actions';
import _ from 'lodash';

const defaultAppState = {
  profilePictureObjects: [],
  profilePictureAlbumDetails: {},
  removedPhotos: [],
  chosenPhotos: [],
};

const profilePictures =  (state = defaultAppState, action) => {
  const { 
    profilePictureObjects,
    chosenPhotos: oldChosenPhotos,
    removedPhotos: oldRemovedPhotos,
  } = state;

  switch(action.type) {
    case DELETE_PROFILE_PICTURE: 
      if (oldChosenPhotos.length === 1) return state;

      const { profilePicture } = action;
      const chosenPhotos = _.filter(oldChosenPhotos, photo => photo.picture !== profilePicture);
      const removedPhotos = _.union(oldRemovedPhotos, [profilePicture]);
      return {
        ...state,
        chosenPhotos,
        removedPhotos,
      };
    case ADD_PROFILE_PICTURE: 
      const newPhotos = _.filter(profilePictureObjects, obj => {
        return !oldRemovedPhotos.includes(obj.picture) && !_.map(oldChosenPhotos, 'picture').includes(obj.picture)
      });
      if (newPhotos.length) {
        return {
          ...state,
          chosenPhotos: _.union(oldChosenPhotos, [newPhotos[0]])
        };
      }
      return {
        ...state,
        chosenPhotos: _.union(oldChosenPhotos, [oldRemovedPhotos[0]]),
        removedPhotos: _.slice(oldRemovedPhotos, 1),
      }
    case INIT_PROFILE_PICTURES: 
      return {
        ...state,
        chosenPhotos: _.take(action.profilePictures, 5),
        profilePictureObjects: action.profilePictures,
      }
    case HYDRATE_PROFILE_PICTURES: 
      return action.userAppState;
    case UPDATE_PROFILE_PICTURE_ALBUM_DETAILS: 
      return {
        ...state,
        profilePictureAlbumDetails: action.albumDetails,
      };
    default:
      return state;
  };
};

export default profilePictures;
