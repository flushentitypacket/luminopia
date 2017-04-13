import { combineReducers } from 'redux';

const noopReducer = (state = {}) => state;

export default combineReducers({
  noopReducer,
});
