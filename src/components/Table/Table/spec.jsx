import React from 'react';
import Reactable from 'reactable';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Table from './';

describe('Table', () => {
  it('wraps Reactable.Table', () => {
    const wrapper = shallow(<Table />);
    expect(wrapper.find(Reactable.Table)).to.have.length(1);
  });
});
