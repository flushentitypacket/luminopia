import types from './types';

export const fetchJwt = (code) => ({
  type: types.FETCH_JWT,
  payload: code,
});

export const setToken = (token) => {
  return {
    type: types.SET_TOKEN,
    payload: token,
  };
}

export const setFetchJwtError = (errorMessage) => {
  return {
    type: types.SET_FETCH_JWT_ERROR,
    payload: errorMessage,
  };
}

export const setLoginIsWaiting = () => {
  return {
    type: types.SET_LOGIN_IS_WAITING,
    payload: true,
  };
}
export const resetLoginIsWaiting = () => {
  return {
    type: types.SET_LOGIN_IS_WAITING,
    payload: false,
  };
}

export const resetFetchJwtError = () => setFetchJwtError(null);

export const fetchChannels = (token) => ({
  type: types.FETCH_CHANNELS,
  payload: token,
});

export const addChannel = ({ name, videoUris }) => ({
  type: types.ADD_CHANNEL,
  payload: { name, videoUris },
});

export const setFetchChannelsError = (errorMessage) => {
  return {
    type: types.SET_FETCH_CHANNELS_ERROR,
    payload: errorMessage,
  }
}

export const resetFetchChannelsError = () => setFetchChannelsError(null);
