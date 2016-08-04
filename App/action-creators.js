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
  UPDATE_LOOKINGFOR_CRITERIA,
  UPDATE_USER_FLAG,
  UPDATE_USER_ETHNICITY,
  UPDATE_USER_RELIGION,
  UPDATE_USER_TWITTER,
  UPDATE_USER_LIKE,
  HYDRATE_USER,
} from './actions';

const updateUserBioAction = bio => {
  return {
    type: UPDATE_USER_BIO,
    bio,
  };
};

const updateUserEthnicityAction = ethnicity => {
  return {
    type: UPDATE_USER_ETHNICITY,
    ethnicity,
  };
};

const updateUserTwitterAction = twitter => {
  return {
    type: UPDATE_USER_TWITTER,
    twitter,
  };
};

const updateUserReligionAction = religion => {
  return {
    type: UPDATE_USER_RELIGION,
    religion,
  };
};

const updateUserFlagAction = ({ flag, index }) => {
  return {
    type: UPDATE_USER_FLAG,
    flag,
    index,
  };
};

const updateUserLikeAction = like => {
  return {
    type: UPDATE_USER_LIKE,
    like,
  };
};

const updateLookingForCriteriaAction = ({ criteria, value }) => {
  return {
    type: UPDATE_LOOKINGFOR_CRITERIA,
    criteria,
    value,
  };
}

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
  updateUserTwitterAction,
  updateUserEthnicityAction,
  updateUserReligionAction,
  updateLookingForCriteriaAction,
  updateUserFlagAction,
  updateUserLikeAction,
  hydrateUserAction,
};
