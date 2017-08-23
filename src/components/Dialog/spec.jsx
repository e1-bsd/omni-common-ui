import styles from './style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';

import PageLoadingSpinner from 'components/PageLoadingSpinner';
import { Dialog } from './';

test('renders its children if open', () => {
  const wrapper = mount(<Dialog isOpen><div id="innerContent" /></Dialog>);
  expect(document.getElementById('innerContent')).toBeDefined();
  wrapper.unmount();
});

test('does not render its children if not open', () => {
  const wrapper = mount(<Dialog isOpen={false}><div id="innerContent" /></Dialog>);
  expect(document.getElementById('innerContent')).toBeFalsy();
  wrapper.unmount();
});

describe('loading overlay', () => {
  test('shows the loading overlay when loading', () => {
    const wrapper = shallow(<Dialog isOpen isLoading><div /></Dialog>);
    expect(wrapper.find(PageLoadingSpinner)).toHaveLength(1);
    expect(wrapper.find(PageLoadingSpinner).props().isHidden).toBe(false);
  });

  test('hides the loading overlay when not loading', () => {
    const wrapper = shallow(<Dialog isOpen><div /></Dialog>);
    expect(wrapper.find(PageLoadingSpinner)).toHaveLength(1);
    expect(wrapper.find(PageLoadingSpinner).props().isHidden).toBe(true);
  });
});

describe('close button', () => {
  test('contains a close button icon when enabled', () => {
    const wrapper = shallow(<Dialog isOpen withCloseButton />);
    expect(wrapper.find(`.${styles.Dialog_closeIcon}`)).toHaveLength(1);
  });

  test('does not contain a close button icon when not enabled', () => {
    const wrapper = shallow(<Dialog isOpen />);
    expect(wrapper.find(`.${styles.Dialog_closeIcon}`)).toHaveLength(0);
  });

  test('calls `onRequestClose` when the close button is clicked', () => {
    const onRequestClose = jest.fn();
    const wrapper = shallow(<Dialog isOpen withCloseButton onRequestClose={onRequestClose} />);
    const button = wrapper.find(`.${styles.Dialog_closeIcon}`);
    button.simulate('click');
    expect(onRequestClose).toHaveBeenCalledWith('button', undefined);
  });
});
