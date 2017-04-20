import { call, put } from 'redux-saga/effects';
import { channelsActions } from '../actions';
import { getRecommendedChannels } from '../../lib/api';

const {
  addChannel,
  setFetchChannelsError,
  resetFetchChannelsError,
  setChannelsIsWaiting,
  resetChannelsIsWaiting,
} = channelsActions;

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
