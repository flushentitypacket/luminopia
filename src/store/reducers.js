import { combineReducers } from 'redux';
import types from './types';

const noopReducer = (state = {}) => state;

const login = (state = {}, action) => {
  switch (action.type) {
    case types.SET_TOKEN:
      const { payload } = action;
      return {
        ...state,
        token: payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  noopReducer,
  login,
});
