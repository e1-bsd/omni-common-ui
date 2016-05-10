import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Header from './';

describe('Table', () => {
  describe('Header', () => {
    it('renders its children', () => {
      const wrapper = shallow(<Header><div id="innerContent" /></Header>);
      expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
    });

    it('sets context.isHeader to true for its children', () => {
      let isHeader;

      const MockChild = (props, context) => {
        isHeader = context.isHeader;
        return <div></div>;
      };

      MockChild.contextTypes = {
        isHeader: React.PropTypes.bool,
      };

      const wrapper = mount(<Header><MockChild /></Header>);
      expect(isHeader).to.be.true;
    });
  });
});
