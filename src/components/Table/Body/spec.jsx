import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Body from './';

describe('Table', () => {
  describe('Body', () => {
    it('renders its children', () => {
      const wrapper = shallow(<Body><div id="innerContent" /></Body>);
      expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
    });

    it('sets context.isHeader to false for its children', () => {
      let isHeader;

      const MockChild = (props, context) => {
        isHeader = context.isHeader;
        return <div></div>;
      };

      MockChild.contextTypes = {
        isHeader: React.PropTypes.bool,
      };

      const wrapper = mount(<Body><MockChild /></Body>);
      expect(isHeader).to.be.false;
    });
  });
});
