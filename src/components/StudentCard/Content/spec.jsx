import styles from './style.postcss';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Content from './';
import StudentCard from 'components/StudentCard';

test('renders its children', () => {
  const wrapper = shallow(<Content><div id="innerContent" /></Content>);
  expect(wrapper.contains(<div id="innerContent" />)).toBe(true);
});

test('renders a StudentCard.Content with separator class (withSeparatorLine provided)', () => {
  const wrapper = mount(<StudentCard withSeparatorLine><Content /></StudentCard>);
  expect(wrapper.find(Content).hasClass(styles.__withSeparatorLine)).toBe(true);
});
