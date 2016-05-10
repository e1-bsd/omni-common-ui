import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Table from './';

describe('Table', () => {
  it('renders its children', () => {
    const wrapper = shallow(<Table><div id="innerContent" /></Table>);
    expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
  });

  it('wraps its content with a <tbody>', () => {
    const wrapper = mount(<Table><div id="innerContent" /></Table>);
    expect(wrapper.find('tbody')).to.have.length(1);
  });

  it('renders a header if provided', () => {
    const wrapper = shallow(<Table header={() => <div id="header" />} />);
    expect(wrapper.contains(<div id="header" />)).to.be.true;
  });

  it('wraps the header with a <thead>', () => {
    const wrapper = mount(<Table header={() => <div id="header" />} />);
    expect(wrapper.find('thead')).to.have.length(1);
  });
});
