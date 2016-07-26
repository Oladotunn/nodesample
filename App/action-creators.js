import {
  ADD_PROFILE_PICTURE,
  DELETE_PROFILE_PICTURE,
  INIT_PROFILE_PICTURES,
  UPDATE_PROFILE_PICTURE_ALBUM_DETAILS,
  UPDATE_FB_TOKEN,
  UPDATE_FB_CREDS,
} from './actions';

const addProfilePictureAction = () => {
  return {
    type: ADD_PROFILE_PICTURE,
  };
};

const deleteProfilePictureAction = profilePicture => {
  return {
    type: DELETE_PROFILE_PICTURE,
    profilePicture,
  };
};

const initProfilePictureAction = profilePictures => {
  return {
    type: INIT_PROFILE_PICTURES,
    profilePictures,
  };
};

const updateProfilePictureAlbumDetailsAction = albumDetails => {
  return {
    type: UPDATE_PROFILE_PICTURE_ALBUM_ID,
    albumDetails,
  };
};

const updateFbTokenAction = token => {
  return {
    type: UPDATE_FB_TOKEN,
    token,
  };
};

const updateFbCredsAction = credentials => {
  return {
    type: UPDATE_FB_CREDS,
    credentials,
  };
};

const updateFbReadyAction = state => {
  return {
    type: UPDATE_FB_CREDS,
    state,
  };
};

export {
  addProfilePictureAction,
  deleteProfilePictureAction,
  initProfilePictureAction,
  updateProfilePictureAlbumDetailsAction,
  updateFbTokenAction,
  updateFbCredsAction,
  updateFbReadyAction,
};
