import React from 'react';
import { shallow } from 'enzyme';
import Grid from './';

jest.mock('domain/MediaQuery', () => jest.fn(() => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
})));

test('renders its children', () => {
  const wrapper = shallow(<Grid><div id="innerContent" /></Grid>);
  expect(wrapper.contains(<div id="innerContent" />)).toBe(true);
});
