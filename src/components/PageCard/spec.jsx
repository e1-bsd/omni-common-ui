import React from 'react';
import { shallow } from 'enzyme';
import PageCard from './';

describe('PageCard', () => {
  test('renders its children', () => {
    const wrapper = shallow(<PageCard><div id="innerContent" /></PageCard>);
    expect(wrapper.contains(<div id="innerContent" />)).toBe(true);
  });
  test('allows to add custom classes', () => {
    const wrapper = shallow(<PageCard className="aClass" />);
    expect(wrapper).to.have.descendants('.aClass');
  });
});
