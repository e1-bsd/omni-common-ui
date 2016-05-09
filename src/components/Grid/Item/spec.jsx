import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Item from './';

describe('Grid', () => {
  describe('Item', () => {
    it('renders its children', () => {
      const wrapper = shallow(<Item><div id="innerContent" /></Item>);
      expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
    });

    it('uses the CSS classes passed to it', () => {
      const wrapper = shallow(<Item className="aClass" />);
      expect(wrapper.hasClass('aClass')).to.be.true;
    });
  });
});
