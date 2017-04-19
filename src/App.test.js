import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import Login from './containers/Login';
import Channels from './containers/Channels';

describe('App', () => {
  describe('doesnt have token', () => {
    it('renders Login', () => {
      const mounted = shallow(<App token={null} />);
      expect(mounted.find(Login)).toHaveLength(1);
    });
  });

  describe('has token', () => {
    it('renders Channels', () => {
      const mounted = shallow(<App token={'sweetjimminycrickets'} />);
      expect(mounted.find(Channels)).toHaveLength(1);
    });
  })
});
