import React from 'react';
import { mount } from 'enzyme';
import FilterList from './index';

const getMounted = (props = {}) => {
  return mount(<FilterList {...props} />);
};

describe('FilterList', () => {
  it('sends items to children fn', () => {
    const children = jest.fn();
    const item = 'someitem';
    getMounted({ items: [item], children });
    expect(children).toBeCalledWith(item);
  });

  describe('filterFn', () => {
    const children = jest.fn();
    const matchItem = 'iminloveeee';
    const mismatchItem = 'noonelikesme';
    const filterFn = currentItem => currentItem === matchItem;
    getMounted({ items: [matchItem, mismatchItem], filterFn, children });
    expect(children).toBeCalledWith(matchItem);
    expect(children).not.toBeCalledWith(mismatchItem);
  })
});
