import types from '../types';

const initialState = {
  items: [],
  errorMessage: null,
};

const channels = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_CHANNEL:
      return {
        ...state,
        items: [...state.items, payload],
      };
    case types.SET_FETCH_CHANNELS_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };
    case types.SET_CHANNELS_IS_WAITING:
      return {
        ...state,
        isWaiting: payload,
      };
    default:
      return state;
  }
}

export default channels;
