import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import Card from './';

test('renders its children', () => {
  const wrapper = shallow(<Card><div id="innerContent" /></Card>);
  expect(wrapper.contains(<div id="innerContent" />)).toBe(true);
});

test('is given a __borderless class when borderless prop is provided', () => {
  const wrapper = shallow(<Card borderless />);
  expect(wrapper.hasClass(styles.__borderless)).toBe(true);
});
