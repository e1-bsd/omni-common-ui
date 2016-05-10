import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Cell from './';

describe('Table', () => {
  describe('Cell', () => {
    it('renders its children', () => {
      const wrapper = shallow(<Cell><div id="innerContent" /></Cell>);
      expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
    });

    it('renders a normal table cell is header prop is false', () => {
      const wrapper = mount(<Cell header={false} />);
      expect(wrapper.find('td')).to.have.length(1);
    });

    it('renders a table header cell is header prop is true', () => {
      const wrapper = mount(<Cell header={true} />);
      expect(wrapper.find('th')).to.have.length(1);
    });

    it('renders a normal table cell by default', () => {
      const wrapper = mount(<Cell />);
      expect(wrapper.find('td')).to.have.length(1);
    });
  });
});
