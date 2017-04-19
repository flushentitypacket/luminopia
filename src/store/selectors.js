import { createSelector } from 'reselect';

export const getToken = state => state.login.token;
export const getChannels = state => state.channels;
export const getChannelsSortedByName = createSelector(
  getChannels,
  channels => channels.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }),
)
