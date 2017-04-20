import types from '../types';

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
