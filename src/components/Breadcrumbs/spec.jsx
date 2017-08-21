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

test('links have been rendered properly', () => {
  expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`)).toHaveLength(3);
});

test('home button has been rendered properly', () => {
  expect(wrapper.find('.test-crumb-home')).toHaveLength(1);
});

test('only render the first item as a link', () => {
  expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`).last().find('span').text()).toBe('mark attendance');
  expect(wrapper.find(`.${styles.Breadcrumbs_crumb}`).at(1).find(Link)).toHaveLength(1);
});
