import { combineReducers } from 'redux';
import types from './types';

const noopReducer = (state = {}) => state;

const loginInitialState = {
  token: null,
  errorMessage: null,
};
const login = (state = loginInitialState, { type, payload }) => {
  switch (type) {
    case types.SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case types.SET_FETCH_JWT_ERROR:
      return {
        errorMessage: payload,
      };
    default:
      return state;
  }
};

const channelsInitialState = {
  items: [],
  errorMessage: null,
};
const channels = (state = channelsInitialState, { type, payload }) => {
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
    default:
      return state;
  }
}

export default combineReducers({
  noopReducer,
  login,
  channels,
});
