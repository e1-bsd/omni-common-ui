import styles from './style.postcss';

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Dialog from './';

describe('Dialog', () => {
  it('renders its children if open', () => {
    const wrapper = mount(<Dialog isOpen={true}><div id="innerContent" /></Dialog>);
    expect(document.getElementById('innerContent')).to.exist;
    wrapper.unmount();
  });

  it('does not render its children if not open', () => {
    const wrapper = mount(<Dialog isOpen={false}><div id="innerContent" /></Dialog>);
    expect(document.getElementById('innerContent')).to.not.exist;
    wrapper.unmount();
  });
});
