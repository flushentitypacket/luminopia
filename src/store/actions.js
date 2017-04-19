import types from './types';

export const fetchJwt = (code) => ({
  type: types.FETCH_JWT,
  payload: code,
});

export const setToken = (token) => {
  console.log('inside setToken', token);
  return {
    type: types.SET_TOKEN,
    payload: token,
  };
}
