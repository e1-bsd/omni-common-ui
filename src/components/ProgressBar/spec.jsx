import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ProgressBar from './';

describe('ProgressBar', () => {
  describe('when total is not provided', () => {
    it('uses the "progress" property directly as a percentage', () => {
      const wrapper = shallow(<ProgressBar progress={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('45%');
    });

    it('the progress is 0 if no "progress" is provided', () => {
      const wrapper = shallow(<ProgressBar />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('0%');
    });

    it('the progress is 0 if "progress" is negative', () => {
      const wrapper = shallow(<ProgressBar progress={-45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('0%');
    });

    it('the progress is 100 if "progress" is more than 100', () => {
      const wrapper = shallow(<ProgressBar progress={145} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('100%');
    });
  });

  describe('when total is provided', () => {
    it('calculates the progress percentage out of "progress" and "total"', () => {
      const wrapper = shallow(<ProgressBar progress={45} total={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('100%');
    });

    it('the progress is 0 if no "progress" is provided', () => {
      const wrapper = shallow(<ProgressBar total={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('0%');
    });

    it('the progress is 0 if "progress" is negative', () => {
      const wrapper = shallow(<ProgressBar progress={-45} total={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('0%');
    });
  });
});
