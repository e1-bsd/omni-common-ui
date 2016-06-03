import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Group from './';
import Item from '../Item';

describe('Grid', () => {
  describe('Group', () => {
    describe('when it has one child', () => {
      const wrapper = shallow(<Group><div id="child" /></Group>);

      it('renders it', () => {
        expect(wrapper.contains(<div id="child" />)).to.be.true;
      });

      it('wraps it with Item if it is not an Item', () => {
        expect(wrapper.find(Item)).to.have.length(1);
      });

      it('wraps it only if it is not an Item', () => {
        shallow(<Group><Item><div id="child" /></Item></Group>);
        expect(wrapper.find(Item)).to.have.length(1);
      });
    });

    describe('when it has several children', () => {
      const wrapper = shallow(<Group>
        <div id="child1" />
        <div id="child2" />
      </Group>);

      it('renders them', () => {
        expect(wrapper.contains(<div id="child1" />)).to.be.true;
        expect(wrapper.contains(<div id="child2" />)).to.be.true;
      });

      it('wraps them with Item if they are not an Item', () => {
        expect(wrapper.find(Item)).to.have.length(2);
      });

      it('wraps only children that are not an Item', () => {
        shallow(<Group>
          <div id="child1" />
          <Item><div id="child2" /></Item>
        </Group>);
        expect(wrapper.find(Item)).to.have.length(2);
      });
    });
  });
});
