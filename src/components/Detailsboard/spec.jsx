import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import DetailBoard from './';

describe('DetailBoard', () => {
  it('renders itself with title and value', () => {
    const wrapper = shallow(<DetailBoard title="test" value="test" />);
    expect(wrapper).to.have.className(styles.Detailsboard_board);
  });
});
