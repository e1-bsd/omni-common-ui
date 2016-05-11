import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Row from './';
import Cell from '../Cell';

describe('Table', () => {
  describe('Row', () => {
    it('renders its children', () => {
      const wrapper = shallow(<Row><div id="innerContent" /></Row>);
      expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
    });

    it('renders an extra cell when context.expandable is true', () => {
      const wrapper = shallow(<Row />, { context: { expandable: true } });
      expect(wrapper.find(Cell)).to.have.length(1);
    });
  });
});
