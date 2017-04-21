import React from 'react';
import { mount } from 'enzyme';
import { Channels } from './index';

const getMounted = (props = {}) => mount(<Channels {...props} />);

describe('Channels', () => {
  describe('given token', () => {
    it('fetches channels on mount', () => {
      const fetchChannels = jest.fn();
      getMounted({ fetchChannels, token: 'cooltokenbro' });
      expect(fetchChannels).toBeCalled();
    });
  })

  describe('token changes', () => {
    it('fetches channels', () => {
      const fetchChannels = jest.fn();
      const mounted = getMounted({ fetchChannels });
      expect(fetchChannels).not.toBeCalled();
      mounted.setProps({ fetchChannels, token: 'bunniesarecute' });
      expect(fetchChannels).toBeCalled();
    });
  });
});
