import { takeLatest, call, put } from 'redux-saga/effects';
import {
  setToken,
  setFetchJwtError,
  resetFetchJwtError,
  setLoginIsWaiting,
  resetLoginIsWaiting,
  addChannel,
  setFetchChannelsError,
  resetFetchChannelsError,
  setChannelsIsWaiting,
  resetChannelsIsWaiting,
} from './actions';
import types from './types';
import { generateJwt, getRecommendedChannels } from '../lib/api';

export function* fetchJwt({ payload }) {
  yield put(setLoginIsWaiting());
  const { response, error } = yield call(generateJwt, payload);
  if (response) {
    const { token } = response;
    yield [
      put(resetFetchJwtError()),
      put(setToken(token)),
    ];
  } else {
    const { message } = error;
    yield put(setFetchJwtError(message));
  }
  yield put(resetLoginIsWaiting());
}

export function* fetchChannels({ payload }) {
  yield put(setChannelsIsWaiting());
  const { response, error } = yield call(getRecommendedChannels, payload);
  if (response) {
    const channels = Object.keys(response)
      .map(k => response[k])
      .map(c => ({ name: c.name, videoUris: c.video_uris }));
    yield [
      put(resetFetchChannelsError()),
      ...channels.map(c => put(addChannel(c))),
    ];
  } else {
    const { message } = error;
    yield put(setFetchChannelsError(message));
  }
  yield put(resetChannelsIsWaiting());
}

function* sagas() {
  yield [
    takeLatest(types.FETCH_JWT, fetchJwt),
    takeLatest(types.FETCH_CHANNELS, fetchChannels),
  ];
}

export default sagas;
