import { call, put } from 'redux-saga/effects';
import { fetchJwt, fetchChannels } from './sagas';
import {
  setToken,
  setFetchJwtError,
  resetFetchJwtError,
  setLoginIsWaiting,
  resetLoginIsWaiting,
  addChannel,
  setFetchChannelsError,
  resetFetchChannelsError,
} from './actions';
import { generateJwt, getRecommendedChannels } from '../lib/api';

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

describe('fetchChannels', () => {
  it('requests channels from api and adds them to state', () => {
    const token = 'whataboutsteaktho';
    const action = { payload: token };
    const gen = fetchChannels(action);
    expect(gen.next().value).toEqual(call(getRecommendedChannels, token));

    const videoUris = ['https://example.com'];
    const name = 'TV Monster Babies';
    const response = {
      TELETUBBIES: {
        name,
        video_uris: videoUris,
      },
    };
    const channel = { name, videoUris };
    expect(gen.next({ response }).value).toEqual([
      put(resetFetchChannelsError()),
      put(addChannel(channel)),
    ]);
  });

  describe('api req results in error', () => {
    it('requests channels and sets error message', () => {
      const token = 'datchicken';
      const action = { payload: token };
      const gen = fetchChannels(action);
      expect(gen.next().value).toEqual(call(getRecommendedChannels, token));
      const error = { message: 'OH NO EVERYTHING IS FLOODED' };
      expect(gen.next({ error }).value)
        .toEqual(put(setFetchChannelsError(error.message)));
    });
  })
});
