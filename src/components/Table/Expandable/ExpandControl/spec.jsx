import React from 'react';
import Sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ExpandControl from './';

describe('Table', () => {
  describe('Expandable', () => {
    describe('ExpandControl', () => {
      it('renders "Expand" if isOpen is false', () => {
        const wrapper = shallow(<ExpandControl isOpen={false} />);
        expect(wrapper.text()).to.equal('Expand');
      });

      it('renders "Contract" if isOpen is true', () => {
        const wrapper = shallow(<ExpandControl isOpen />);
        expect(wrapper.text()).to.equal('Contract');
      });

      describe('when clicked', () => {
        it('calls onExpand if isOpen is false', () => {
          const onExpand = Sinon.spy();
          const wrapper = shallow(<ExpandControl isOpen={false} onExpand={onExpand} />);
          wrapper.simulate('click');
          expect(onExpand.called).to.be.true;
        });

        it('calls onContract if isOpen is true', () => {
          const onContract = Sinon.spy();
          const wrapper = shallow(<ExpandControl isOpen onContract={onContract} />);
          wrapper.simulate('click');
          expect(onContract.called).to.be.true;
        });

        it('throws an error if onExpand is not provided and isOpen is false', () => {
          const wrapper = shallow(<ExpandControl isOpen={false} onContract={() => {}} />);
          expect(() => wrapper.simulate('click')).to.throw();
        });

        it('throws an error if onContract is not provided and isOpen is true', () => {
          const wrapper = shallow(<ExpandControl isOpen onExpand={() => {}} />);
          expect(() => wrapper.simulate('click')).to.throw();
        });
      });
    });
  });
});
