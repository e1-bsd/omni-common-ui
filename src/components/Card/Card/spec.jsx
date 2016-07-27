import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Card from './';

describe('Card', () => {
  it('renders its children', () => {
    const wrapper = shallow(<Card><div id="innerContent" /></Card>);
    expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
  });
});
