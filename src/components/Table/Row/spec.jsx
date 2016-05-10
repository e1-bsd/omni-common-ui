import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Row from './';

describe('Table', () => {
  describe('Row', () => {
    it('renders its children', () => {
      const wrapper = shallow(<Row><div id="innerContent" /></Row>);
      expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
    });
  });
});
