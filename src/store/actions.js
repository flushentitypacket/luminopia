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

export const fetchChannels = (token) => ({
  type: types.FETCH_CHANNELS,
  payload: token,
});

export const addChannel = ({ name, videoUris }) => ({
  type: types.ADD_CHANNEL,
  payload: { name, videoUris },
});
