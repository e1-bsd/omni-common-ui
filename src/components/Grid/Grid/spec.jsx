import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Grid from './';

describe('Grid', () => {
  it('renders its children', () => {
    const wrapper = shallow(<Grid><div id="innerContent" /></Grid>);
    expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
  });
});
