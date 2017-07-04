import styles from './style.postcss';

import React from 'react';
import { mount } from 'enzyme';

import StudentPicture from 'components/StudentPicture';
import Profile from './';

test('renders a StudentPicture', () => {
  const wrapper = mount(<Profile avatarUrl="url" gender={1} />);
  const containsPicture = wrapper.find(StudentPicture);
  expect(containsPicture).toHaveLength(1);
});

test('renders profile info with the given name', () => {
  const wrapper = mount(<Profile name="John" surname="Doe" localName="王呆呆" />);
  expect(wrapper.find(`.${styles.StudentCard_profile_name}`).text()).toBe('John Doe');
});

test('renders profile info with the given surname', () => {
  const wrapper = mount(<Profile name="John" surname="Doe" localName="王呆呆" />);
  expect(wrapper.find(`.${styles.StudentCard_profile_localName}`).text()).toBe('王呆呆');
});
