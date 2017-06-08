import React from 'react';
import { shallow } from 'enzyme';
import Content from './';

describe('Content', () => {
  test('renders its children', () => {
    const wrapper = shallow(<Content><div id="innerContent" /></Content>);
    expect(wrapper.contains(<div id="innerContent" />)).toBe(true);
  });
});
