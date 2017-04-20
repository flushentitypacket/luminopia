import { call, put } from 'redux-saga/effects';
import { loginActions } from '../actions';
import { generateJwt } from '../../lib/api';

const {
  setToken,
  setFetchJwtError,
  resetFetchJwtError,
  setLoginIsWaiting,
  resetLoginIsWaiting,
} = loginActions;

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
