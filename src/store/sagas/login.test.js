import { call, put } from 'redux-saga/effects';
import { fetchJwt } from './login';
import { loginActions } from '../actions';
import { generateJwt } from '../../lib/api';

const {
  setToken,
  setFetchJwtError,
  resetFetchJwtError,
  setLoginIsWaiting,
  resetLoginIsWaiting,
} = loginActions;

describe('fetchJwt', () => {
  it('sets waiting, requests jwt from api, sets jwt, resets error', () => {
    const code = 'gummybearsaredelicious';
    const token = 'skittlesaretoo';
    const response = { token };
    const gen = fetchJwt({ payload: code });
    expect(gen.next().value).toEqual(put(setLoginIsWaiting()));
    expect(gen.next().value).toEqual(call(generateJwt, code));
    expect(gen.next({ response }).value).toEqual([
      put(resetFetchJwtError()),
      put(setToken(token)),
    ]);
    expect(gen.next().value).toEqual(put(resetLoginIsWaiting()));
    expect(gen.next().done).toBeTruthy();
  });

  describe('api req results in error', () => {
    it('sets waiting, requests jwt, sets error message, resets waiting', () => {
      const code = 'gummybearsaredelicious';
      const gen = fetchJwt({ payload: code });
      expect(gen.next().value).toEqual(put(setLoginIsWaiting()));
      expect(gen.next().value).toEqual(call(generateJwt, code));
      const error = { message: 'OH NO EVERYTHING IS BURNING' };
      expect(gen.next({ error }).value)
        .toEqual(put(setFetchJwtError(error.message)));
      expect(gen.next().value).toEqual(put(resetLoginIsWaiting()));
      expect(gen.next().done).toBeTruthy();
    });
  })
})
