import types from './types';

export const fetchJwt = (code) => ({
  type: types.FETCH_JWT,
  payload: code,
});
