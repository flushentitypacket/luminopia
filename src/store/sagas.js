import { takeLatest, call, put } from 'redux-saga/effects';
import { setToken } from './actions';
import types from './types';
import { generateJwt, getRecommendedChannels } from '../lib/api';

export function* fetchJwt({ payload }) {
  const response = yield call(generateJwt, payload);
  const { token } = response;
  yield put(setToken(token));
}

export function* fetchChannels({ payload }) {
  const response = yield call(getRecommendedChannels, payload);
}

function* sagas() {
  yield [
    takeLatest(types.FETCH_JWT, fetchJwt),
    takeLatest(types.FETCH_CHANNELS, fetchChannels),
  ];
}

export default sagas;
