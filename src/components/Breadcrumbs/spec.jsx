import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import Breadcrumbs from './';
import styles from './style.postcss';

const groupLink = {
  label: 'group1',
  href: '/group/1',
  clickable: true,
};

const markAttendanceLink = {
  label: 'mark attendance',
  clickable: false,
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Breadcrumbs items={[groupLink, markAttendanceLink]} />);
});

test('links has been rendered properly', () => {
  expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`)).toHaveLength(2);
});

test('back button has been rendered properly', () => {
  expect(wrapper.find(`.${styles.Breadcrumbs_crumb_back}`)).toHaveLength(1);
});

test('only render the first item as a link', () => {
  expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`).last().find('span').text()).toBe('mark attendance');
  expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`).first().find(Link)).toHaveLength(1);
});
