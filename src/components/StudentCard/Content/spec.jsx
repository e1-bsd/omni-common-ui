import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Content from './';

describe('Content', () => {
  it('renders its children', () => {
    const wrapper = shallow(<Content><div id="innerContent" /></Content>);
    expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
  });
});
