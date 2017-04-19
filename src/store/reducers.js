import { combineReducers } from 'redux';
import types from './types';

const noopReducer = (state = {}) => state;

const tokenReducer = (state = {}, action) => {
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
  tokenReducer,
});
