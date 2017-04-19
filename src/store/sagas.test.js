import { call, put } from 'redux-saga/effects';
import { fetchJwt, fetchChannels } from './sagas';
import { setToken, addChannel } from './actions';
import { generateJwt, getRecommendedChannels } from '../lib/api';

describe('fetchJwt', () => {
  it('requests jwt from api and sets jwt', () => {
    const code = 'gummybearsaredelicious';
    const token = 'skittlesaretoo';
    const response = { token };
    const gen = fetchJwt({ payload: code });
    expect(gen.next().value).toEqual(call(generateJwt, code));
    expect(gen.next(response).value).toEqual(put(setToken(token)));
    expect(gen.next().done).toBeTruthy();
  });

  describe('bad shit goes down', () => {
    // TODO: handling for non 200 case
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
    expect(gen.next(response).value).toEqual([put(addChannel(channel))]);
  });

  describe('bad shit goes down', () => {
    // TODO: handling for non 200 case
  })
});
