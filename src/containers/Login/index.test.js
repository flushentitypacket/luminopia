import React from 'react';
import { mount } from 'enzyme';
import { Login } from './index';

const getMounted = (props = {}) => mount(<Login {...props} />);

describe('Login', () => {
  describe('form submitted', () => {
    it('calls onSubmit with code', () => {
      const code = 'sosekritttttt';
      const onSubmit = jest.fn();
      const mounted = getMounted({ onSubmit });
      mounted.setState({ code });
      mounted.find('form').simulate('submit');
      expect(onSubmit).toHaveBeenCalledWith({ code });
    });
  })
});
