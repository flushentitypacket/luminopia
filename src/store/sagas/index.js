import { takeLatest } from 'redux-saga/effects';
import types from '../types';
import { fetchJwt } from './login';
import { fetchChannels } from './channels';

function* sagas() {
  yield [
    takeLatest(types.FETCH_JWT, fetchJwt),
    takeLatest(types.FETCH_CHANNELS, fetchChannels),
  ];
}

export default sagas;
