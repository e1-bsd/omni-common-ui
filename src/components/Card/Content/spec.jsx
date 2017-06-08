import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import { Content } from './';

describe('Card.Content', () => {
  test('renders its children', () => {
    const wrapper = shallow(<Content><div id="innerContent" /></Content>);
    expect(wrapper.contains(<div id="innerContent" />)).toBe(true);
  });
  test('sets the bottomless padding style when the property is supplied', () => {
    const wrapper = shallow(<Content withoutBottomPadding />);
    expect(wrapper).to.have.className(styles.__bottomless);
  });
  test('does not set the bottomless padding style when the property is omitted', () => {
    const wrapper = shallow(<Content />);
    expect(wrapper).to.not.have.className(styles.__bottomless);
  });
});
