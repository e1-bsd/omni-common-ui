import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Item from './';

describe('Grid', () => {
  let options;
  let grid;

  beforeEach(() => {
    grid = {
      'col-xs-12': 'col-xs-12',
      'col-sm-6': 'col-sm-6',
      'col-md-4': 'col-md-4',
      'col-lg-3': 'col-lg-3',
    };

    options = { context: { grid } };
  });

  describe('Item', () => {
    it('renders its children', () => {
      const wrapper = shallow(<Item><div id="innerContent" /></Item>, options);
      expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
    });

    it('uses col-xs-12 if no configuration is provided', () => {
      const wrapper = shallow(<Item />, options);
      expect(wrapper.hasClass(grid['col-xs-12'])).to.be.true;
    });

    it('uses col-xs-12 if no xs configuration is provided', () => {
      const wrapper = shallow(<Item md={2} />, options);
      expect(wrapper.hasClass(grid['col-xs-12'])).to.be.true;
    });

    it('applies the classes according to the properties it is passed', () => {
      const wrapper = shallow(<Item xs={12} sm={6} md={4} lg={3} />, options);
      expect(wrapper.hasClass(grid['col-xs-12'])).to.be.true;
      expect(wrapper.hasClass(grid['col-sm-6'])).to.be.true;
      expect(wrapper.hasClass(grid['col-md-4'])).to.be.true;
      expect(wrapper.hasClass(grid['col-lg-3'])).to.be.true;
    });
  });
});
