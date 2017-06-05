import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from 'components/Tooltip';
import { ColourLabel } from './';

describe('<ColourLabel />', () => {
  context('when neither initial nor text is provided', () => {
    it('renders nothing', () => {
      const wrapper = shallow(<ColourLabel />);
      expect(wrapper).to.be.blank();
    });
  });

  context('when initial is not provided', () => {
    it('renders a big label with the text', () => {
      const wrapper = shallow(<ColourLabel text={'hey'} />);
      expect(wrapper.find(`.${styles.ColourLabel_inner}`)).to.have.text('hey');
    });
  });

  context('when initial is provided', () => {
    context('when text is not provided', () => {
      it('renders a small label with the initial without any tooltip', () => {
        const wrapper = shallow(<ColourLabel initial={'h'} />);
        expect(wrapper.find(`.${styles.ColourLabel_inner}`)).to.have.text('h');
        expect(wrapper.find(Tooltip)).toHaveLength(0);
      });
    });

    context('when text is provided', () => {
      it('renders a small label with the initial and a tooltip with the text', () => {
        const wrapper = shallow(<ColourLabel initial={'h'} text={'on hold'} />);
        const tooltip = wrapper.find(Tooltip);
        expect(wrapper.find(`.${styles.ColourLabel_inner}`)).to.have.text('h');
        expect(tooltip).toHaveLength(1);
        expect(tooltip.prop('text')).toBe('on hold');
      });
    });
  });
});
