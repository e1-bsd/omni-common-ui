import styles from './style.postcss';

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ProductionStatus from './';
import Tooltip from 'components/Tooltip';

describe('<ProductionStatus />', () => {
  context('when neither initial nor status is provided', () => {
    it('renders nothing', () => {
      const wrapper = shallow(<ProductionStatus />);
      expect(wrapper).to.be.blank();
    });
  });

  context('when initial is not provided', () => {
    it('renders a big label with the status', () => {
      const wrapper = shallow(<ProductionStatus status={'hey'} />);
      expect(wrapper.find(`.${styles.ProductionStatus_inner}`)).to.have.text('hey');
    });
  });

  context('when initial is provided', () => {
    context('when status is not provided', () => {
      it('renders a small label with the initial without any tooltip', () => {
        const wrapper = shallow(<ProductionStatus initial={'h'} />);
        expect(wrapper.find(`.${styles.ProductionStatus_inner}`)).to.have.text('h');
        expect(wrapper.find(Tooltip)).to.have.length(0);
      });
    });

    context('when status is provided', () => {
      it('renders a small label with the initial and a tooltip with the status', () => {
        const wrapper = shallow(<ProductionStatus initial={'h'} status={'on hold'} />);
        const tooltip = wrapper.find(Tooltip);
        expect(wrapper.find(`.${styles.ProductionStatus_inner}`)).to.have.text('h');
        expect(tooltip).to.have.length(1);
        expect(tooltip.prop('text')).to.equal('on hold');
      });
    });
  });
});
