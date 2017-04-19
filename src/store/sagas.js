import { takeLatest, call, put } from 'redux-saga/effects';
import { setToken } from './actions';
import types from './types';
import { generateJwt } from '../lib/api';

export function* fetchJwt({ payload }) {
  const response = yield call(generateJwt, payload);
  const { token } = response;
  yield put(setToken(token));
}

function* sagas() {
  yield [
    takeLatest(types.FETCH_JWT, fetchJwt)
  ];
}

export default sagas;
