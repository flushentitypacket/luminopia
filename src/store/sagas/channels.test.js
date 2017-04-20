import { call, put } from 'redux-saga/effects';
import { fetchChannels } from './channels';
import { channelsActions } from '../actions';
import { getRecommendedChannels } from '../../lib/api';

const {
  addChannel,
  setFetchChannelsError,
  resetFetchChannelsError,
  setChannelsIsWaiting,
  resetChannelsIsWaiting,
} = channelsActions;

describe('fetchChannels', () => {
  it('sets waiting, requests channels from api, adds them to state, resets waiting', () => {
    const token = 'whataboutsteaktho';
    const action = { payload: token };
    const gen = fetchChannels(action);
    expect(gen.next().value).toEqual(put(setChannelsIsWaiting()));
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
    expect(gen.next().value).toEqual(put(resetChannelsIsWaiting()));
    expect(gen.next().done).toBeTruthy();
  });

  describe('api req results in error', () => {
    it('sets waiting, requests channels, sets error message, resets waiting', () => {
      const token = 'datchicken';
      const action = { payload: token };
      const gen = fetchChannels(action);
      expect(gen.next().value).toEqual(put(setChannelsIsWaiting()));
      expect(gen.next().value).toEqual(call(getRecommendedChannels, token));
      const error = { message: 'OH NO EVERYTHING IS FLOODED' };
      expect(gen.next({ error }).value)
        .toEqual(put(setFetchChannelsError(error.message)));
      expect(gen.next().value).toEqual(put(resetChannelsIsWaiting()));
      expect(gen.next().done).toBeTruthy();
    });
  })
});
