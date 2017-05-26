import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ProgressBar } from './';

describe('ProgressBar', () => {
  describe('when total is not provided', () => {
    it('uses the "progress" property directly as a percentage', () => {
      const wrapper = shallow(<ProgressBar value={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('45%');
    });

    it('the progress is 0 if no "progress" is provided', () => {
      const wrapper = shallow(<ProgressBar />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('0%');
    });

    it('the progress is 0 if "progress" is negative', () => {
      const wrapper = shallow(<ProgressBar value={- 45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('0%');
    });

    it('the progress is 100 if "progress" is more than 100', () => {
      const wrapper = shallow(<ProgressBar value={145} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('100%');
    });
  });

  describe('when total is provided', () => {
    it('calculates the progress percentage out of "progress" and "total"', () => {
      const wrapper = shallow(<ProgressBar value={45} max={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('100%');
    });

    it('the progress is 0 if no "progress" is provided', () => {
      const wrapper = shallow(<ProgressBar max={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('0%');
    });

    it('the progress is 0 if "progress" is negative', () => {
      const wrapper = shallow(<ProgressBar value={- 45} max={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('0%');
    });

    it('the progress is 100 if fraction is greater than 1', () => {
      const wrapper = shallow(<ProgressBar value={200} max={100} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).to.equal('100%');
    });
  });
});
