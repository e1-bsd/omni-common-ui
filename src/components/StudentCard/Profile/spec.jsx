import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import { shallow } from 'enzyme';

import StudentPicture from 'components/StudentPicture';
import Profile from './';

jest.mock('domain/Config');

test('renders a StudentPicture with the given attributes', () => {
  const wrapper = shallow(<Profile avatarUrl="url" gender={1} />);
  const containsPicture = wrapper.contains(<StudentPicture src="url"
      gender={1}
      className={styles.StudentCard_profile_image} />);
  expect(containsPicture).toBe(true);
});

test('renders a bigger StudentPicture with the withBiggerAvatar prop', () => {
  const wrapper = shallow(<Profile withBiggerAvatar avatarUrl="url" gender={1} />);
  const containsPicture = wrapper.contains(<StudentPicture src="url"
      gender={1}
      className={classnames(styles.StudentCard_profile_image, styles.__bigger)} />);
  expect(containsPicture).toBe(true);
});

test('renders profile info with the given name', () => {
  const wrapper = shallow(<Profile name="John" surname="Doe" localName="王呆呆" />);
  expect(wrapper.find(`.${styles.StudentCard_profile_name}`).text()).toBe('John Doe');
});

test('renders profile info with the given surname', () => {
  const wrapper = shallow(<Profile name="John" surname="Doe" localName="王呆呆" />);
  expect(wrapper.find(`.${styles.StudentCard_profile_localName}`).text()).toBe('王呆呆');
});
