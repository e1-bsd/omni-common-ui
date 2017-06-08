import React from 'react';
import { shallow } from 'enzyme';
import Grid from './';

describe('Grid', () => {
  test('renders its children', () => {
    const wrapper = shallow(<Grid><div id="innerContent" /></Grid>);
    expect(wrapper.contains(<div id="innerContent" />)).toBe(true);
  });
});
