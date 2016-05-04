import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Button from './button';

describe('Button', () => {
  it('renders its children', () => {
    const wrapper = shallow(<Button><div id="innerContent" /></Button>);
    expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
  });
});
