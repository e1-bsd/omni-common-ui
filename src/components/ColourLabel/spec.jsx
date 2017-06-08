import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from 'components/Tooltip';
import { ColourLabel } from './';

describe('<ColourLabel />', () => {
  describe('when neither initial nor text is provided', () => {
    test('renders nothing', () => {
      const wrapper = shallow(<ColourLabel />);
      expect(wrapper).to.be.blank();
    });
  });

  describe('when initial is not provided', () => {
    test('renders a big label with the text', () => {
      const wrapper = shallow(<ColourLabel text={'hey'} />);
      expect(wrapper.find(`.${styles.ColourLabel_inner}`)).to.have.text('hey');
    });
  });

  describe('when initial is provided', () => {
    describe('when text is not provided', () => {
      test('renders a small label with the initial without any tooltip', () => {
        const wrapper = shallow(<ColourLabel initial={'h'} />);
        expect(wrapper.find(`.${styles.ColourLabel_inner}`)).to.have.text('h');
        expect(wrapper.find(Tooltip)).toHaveLength(0);
      });
    });

    describe('when text is provided', () => {
      test('renders a small label with the initial and a tooltip with the text', () => {
        const wrapper = shallow(<ColourLabel initial={'h'} text={'on hold'} />);
        const tooltip = wrapper.find(Tooltip);
        expect(wrapper.find(`.${styles.ColourLabel_inner}`)).to.have.text('h');
        expect(tooltip).toHaveLength(1);
        expect(tooltip.prop('text')).toBe('on hold');
      });
    });
  });
});
