import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import types from './types';
import { generateJwt } from '../lib/api';

function* fetchJwt({ payload }) {
  console.log('fetching jwt with code', payload);
}

function* sagas() {
  yield [
    takeLatest(types.FETCH_JWT, fetchJwt)
  ];
}

export default sagas;
