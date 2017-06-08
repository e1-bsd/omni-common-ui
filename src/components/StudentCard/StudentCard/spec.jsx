import styles from './style.postcss';
import profileStyles from '../Profile/style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';
import StudentCard from 'components/StudentCard';
import Card from 'components/Card';
import classnames from 'classnames';

test('renders its children', () => {
  const wrapper = shallow(<StudentCard><div id="innerContent" /></StudentCard>);
  expect(wrapper.contains(<div id="innerContent" />)).toBe(true);
});

test('renders a Card descendent', () => {
  const wrapper = shallow(<StudentCard />);
  expect(wrapper.find(Card)).toHaveLength(1);
});

test('adds the borderless prop to Card when borderless prop is provided', () => {
  const wrapper = shallow(<StudentCard borderless />);
  expect(wrapper.find(Card).prop('borderless')).toBe(true);
});

test('sets the given status accent color class when provided', () => {
  const wrapper = shallow(<StudentCard statusAccentColor="grey" />);
  expect(wrapper.find('div').prop('className')).toBe(classnames(styles.StudentCard, styles.__grey));
});

test('renders a StudentCard.Profile when provided', () => {
  const wrapper = shallow(<StudentCard><StudentCard.Profile /></StudentCard>);
  expect(wrapper.contains(<StudentCard.Profile />)).toBe(true);
});

test('renders a StudentCard.Content when provided', () => {
  const wrapper = shallow(<StudentCard><StudentCard.Content /></StudentCard>);
  expect(wrapper.contains(<StudentCard.Content />)).toBe(true);
});

test('renders a StudentCard.Profile without separator class by default', () => {
  const wrapper = mount(<StudentCard><StudentCard.Profile /></StudentCard>);
  expect(wrapper.find(Card.Content).children().hasClass(profileStyles.__separated)).toBe(false);
});

test('renders a StudentCard.Profile with separator class (withSeparatorLine provided)', () => {
  const wrapper = mount(<StudentCard withSeparatorLine><StudentCard.Profile /></StudentCard>);
  expect(wrapper.find(Card.Content).children().hasClass(profileStyles.__separated)).toBe(true);
});
