import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Card from './';

describe('Card', () => {
  it('renders its children', () => {
    const wrapper = shallow(<Card><div id="innerContent" /></Card>);
    expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
  });

  it('is given a __borderless class when borderless prop is provided', () => {
    const wrapper = shallow(<Card borderless />);
    expect(wrapper).to.have.className(styles.__borderless);
  });
});
