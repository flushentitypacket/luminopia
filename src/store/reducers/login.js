import types from '../types';

const initialState = {
  token: null,
  errorMessage: null,
  isWaiting: false,
};

const login = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case types.SET_FETCH_JWT_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };
    case types.SET_LOGIN_IS_WAITING:
      return {
        ...state,
        isWaiting: payload,
      };
    default:
      return state;
  }
};

export default login;
