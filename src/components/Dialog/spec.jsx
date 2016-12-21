import styles from './style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import Dialog from './';

describe('Dialog', () => {
  it('renders its children if open', () => {
    const wrapper = mount(<Dialog isOpen><div id="innerContent" /></Dialog>);
    expect(document.getElementById('innerContent')).to.exist;
    wrapper.unmount();
  });

  it('does not render its children if not open', () => {
    const wrapper = mount(<Dialog isOpen={false}><div id="innerContent" /></Dialog>);
    expect(document.getElementById('innerContent')).to.not.exist;
    wrapper.unmount();
  });

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
