import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import { ProgressBar } from './';

describe('ProgressBar', () => {
  describe('when total is not provided', () => {
    test('uses the "progress" property directly as a percentage', () => {
      const wrapper = shallow(<ProgressBar value={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).toBe('45%');
    });

    test('the progress is 0 if no "progress" is provided', () => {
      const wrapper = shallow(<ProgressBar />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).toBe('0%');
    });

    test('the progress is 0 if "progress" is negative', () => {
      const wrapper = shallow(<ProgressBar value={- 45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).toBe('0%');
    });

    test('the progress is 100 if "progress" is more than 100', () => {
      const wrapper = shallow(<ProgressBar value={145} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).toBe('100%');
    });
  });

  describe('when total is provided', () => {
    test('calculates the progress percentage out of "progress" and "total"', () => {
      const wrapper = shallow(<ProgressBar value={45} max={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).toBe('100%');
    });

    test('the progress is 0 if no "progress" is provided', () => {
      const wrapper = shallow(<ProgressBar max={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).toBe('0%');
    });

    test('the progress is 0 if "progress" is negative', () => {
      const wrapper = shallow(<ProgressBar value={- 45} max={45} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).toBe('0%');
    });

    test('the progress is 100 if fraction is greater than 1', () => {
      const wrapper = shallow(<ProgressBar value={200} max={100} />);
      const progress = wrapper.find(`.${styles.ProgressBar_progress}`);
      expect(progress.props().style.width).toBe('100%');
    });
  });
});
