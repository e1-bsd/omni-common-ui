import React from 'react';
import { shallow } from 'enzyme';
import Group from './';
import Item from '../Item';

describe('Grid', () => {
  let options;

  beforeEach(() => {
    options = { context: { grid: {} } };
  });

  describe('Group', () => {
    describe('when it has one child', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(<Group><div id="child" /></Group>, options);
      });

      it('renders it', () => {
        expect(wrapper.contains(<div id="child" />)).toBe(true);
      });

      it('wraps it with Item if it is not an Item', () => {
        expect(wrapper.find(Item)).toHaveLength(1);
      });

      it('wraps it only if it is not an Item', () => {
        shallow(<Group><Item><div id="child" /></Item></Group>, options);
        expect(wrapper.find(Item)).toHaveLength(1);
      });

      it('does not crash if no children are provided', () => {
        expect(() => shallow(<Group />, options)).not.toThrowError();
      });

      it('does not crash if an invalid child is provided', () => {
        expect(() => shallow(<Group><div />{null}</Group>, options)).not.toThrowError();
      });
    });

    describe('when it has several children', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(<Group><div id="child1" /><div id="child2" /></Group>, options);
      });

      it('renders them', () => {
        expect(wrapper.contains(<div id="child1" />)).toBe(true);
        expect(wrapper.contains(<div id="child2" />)).toBe(true);
      });

      it('wraps them with Item if they are not an Item', () => {
        expect(wrapper.find(Item)).toHaveLength(2);
      });

      it('wraps only children that are not an Item', () => {
        shallow(<Group>
          <div id="child1" />
          <Item><div id="child2" /></Item>
        </Group>, options);
        expect(wrapper.find(Item)).toHaveLength(2);
      });
    });
  });
});
