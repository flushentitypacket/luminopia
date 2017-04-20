import types from '../types';

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

export const setChannelsIsWaiting = () => {
  return {
    type: types.SET_CHANNELS_IS_WAITING,
    payload: true,
  };
}
export const resetChannelsIsWaiting = () => {
  return {
    type: types.SET_CHANNELS_IS_WAITING,
    payload: false,
  };
}
