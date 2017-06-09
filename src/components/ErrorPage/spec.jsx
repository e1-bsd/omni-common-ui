import styles from './style.postcss';
import React from 'react';
import { shallow } from 'enzyme';
import { ErrorPage } from './';

let props;

beforeEach(() => {
  props = {
    erroredApi: {
      error: new Error('an error'),
    },
  };
});

test('uses the default behaviour if no config is passed', () => {
  const wrapper = shallow(<ErrorPage {...props} />);
  expect(wrapper.find(`.${styles.ErrorPage_text}`).contains('Omni could not load this page.')).toBe(true);
  expect(wrapper.find(`.${styles.ErrorPage_image}`).prop('id')).toBe('warning');
});

test('allows to customise the icon if config.icon is provided', () => {
  props.config = { icon: () => 'custom-id' };
  const wrapper = shallow(<ErrorPage {...props} />);
  expect(wrapper.find(`.${styles.ErrorPage_image}`).prop('id')).toBe('custom-id');
});

test('allows to customise the error message if config.message is provided', () => {
  props.config = { message: () => 'my custom error' };
  const wrapper = shallow(<ErrorPage {...props} />);
  expect(wrapper.find(`.${styles.ErrorPage_text}`).contains('my custom error')).toBe(true);
});
