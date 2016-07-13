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
  it('sets the default status accent color class when enabled', () => {
    const wrapper = shallow(<Card showStatusAccent />);
    expect(wrapper).to.have.className(styles.__grey);
  });
  it('sets the default status accent color class when provided but invalid', () => {
    const wrapper = shallow(<Card showStatusAccent statusAccentColor="other" />);
    expect(wrapper).to.have.className(styles.__grey);
  });
  it('sets the given status accent color class when provided', () => {
    const wrapper = shallow(<Card showStatusAccent statusAccentColor="green" />);
    expect(wrapper).to.have.className(styles.__green);
  });
  it('sets no accent color class when provided but disabled', () => {
    const wrapper = shallow(<Card statusAccentColor="green" />);
    expect(wrapper).to.not.have.className(styles.__green);
  });
});
