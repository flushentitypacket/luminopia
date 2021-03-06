import { createSelector } from 'reselect';

export const getChannels = state => state.channels.items;
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
export const getChannelsErrorMessage = state => state.channels.errorMessage;
export const getChannelsIsWaiting = state => state.channels.isWaiting;
