import {
  ADD_PROFILE_PICTURE,
  DELETE_PROFILE_PICTURE,
  INIT_PROFILE_PICTURES,
  HYDRATE_PROFILE_PICTURES,
  UPDATE_PROFILE_PICTURE_ALBUM_DETAILS,
  UPDATE_FB_TOKEN,
  UPDATE_FB_CREDS,
  HYDRATE_FB,
  UPDATE_USER_BIO,
  UPDATE_USER_FLAG,
  HYDRATE_USER,
} from './actions';

const updateUserBioAction = bio => {
  return {
    type: UPDATE_USER_BIO,
    bio,
  };
};

const updateUserFlagAction = flag => {
  return {
    type: UPDATE_USER_FLAG,
    flag,
  };
};

const hydrateUserAction = userAppState => {
  return {
    type: HYDRATE_USER,
    userAppState
  };
};

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

const hydrateProfilePicturesAction = userAppState => {
  return {
    type: HYDRATE_PROFILE_PICTURES,
    userAppState
  };
};

const updateProfilePictureAlbumDetailsAction = albumDetails => {
  return {
    type: UPDATE_PROFILE_PICTURE_ALBUM_DETAILS,
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

const hydrateFbAction = userAppState => {
  return {
    type: HYDRATE_FB,
    userAppState
  };
};

export {
  addProfilePictureAction,
  deleteProfilePictureAction,
  initProfilePictureAction,
  hydrateProfilePicturesAction,
  updateProfilePictureAlbumDetailsAction,
  updateFbTokenAction,
  updateFbCredsAction,
  updateFbReadyAction,
  hydrateFbAction,
  updateUserBioAction,
  updateUserFlagAction,
  hydrateUserAction,
};
