import styles from './style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Sinon from 'sinon';

import { Dialog } from './';

describe('Dialog', () => {
  it('renders its children if open', () => {
    const wrapper = mount(<Dialog isOpen><div id="innerContent" /></Dialog>);
    expect(document.getElementById('innerContent')).toBeDefined();
    wrapper.unmount();
  });

  it('does not render its children if not open', () => {
    const wrapper = mount(<Dialog isOpen={false}><div id="innerContent" /></Dialog>);
    expect(document.getElementById('innerContent')).toBeFalsy();
    wrapper.unmount();
  });

  describe('loading overlay', () => {
    it('shows the loading overlay when loading', () => {
      const wrapper = shallow(<Dialog isOpen isLoading><div /></Dialog>);
      expect(wrapper).to.have.descendants(
        `.${styles.LoadingOverlay}`
      );
      expect(wrapper).to.have.descendants(
        `.${styles.LoadingOverlay}.${styles.__visible}`
      );
    });

    it('hides the loading overlay when not loading', () => {
      const wrapper = shallow(<Dialog isOpen><div /></Dialog>);
      expect(wrapper).to.have.descendants(
        `.${styles.LoadingOverlay}`
      );
      expect(wrapper).to.not.have.descendants(
        `.${styles.LoadingOverlay}.${styles.__visible}`
      );
    });
  });

  describe('close button', () => {
    it('contains a close button icon when enabled', () => {
      const wrapper = shallow(<Dialog isOpen withCloseButton />);
      expect(wrapper).to.have.descendants(`.${styles.Dialog_closeIcon}`);
    });

    it('does not contain a close button icon when not enabled', () => {
      const wrapper = shallow(<Dialog isOpen />);
      expect(wrapper).to.not.have.descendants(`.${styles.Dialog_closeIcon}`);
    });

    it('calls `onRequestClose` when the close button is clicked', () => {
      const onRequestClose = Sinon.spy();
      const wrapper = shallow(<Dialog isOpen withCloseButton onRequestClose={onRequestClose} />);
      const button = wrapper.find(`.${styles.Dialog_closeIcon}`);
      button.simulate('click');
      expect(onRequestClose.calledWith('button')).toBe(true);
    });
  });
});
