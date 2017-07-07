import styles from './style.postcss';
import React from 'react';
import { shallow } from 'enzyme';
import Content from './';

test('renders its children', () => {
  const wrapper = shallow(<Content><div id="innerContent" /></Content>);
  expect(wrapper.contains(<div id="innerContent" />)).toBe(true);
});

test('renders a StudentCard.Content with separator class (withSeparatorLine provided)', () => {
  const wrapper = shallow(<Content withSeparatorLine />);
  expect(wrapper.html()).toContain(styles.__withSeparatorLine);
});
