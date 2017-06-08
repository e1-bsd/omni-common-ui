import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DetailsBoard } from './';

describe('DetailsBoard', () => {
  test('renders itself with title and value', () => {
    const wrapper = shallow(<DetailsBoard title="test" value="test" />);
    expect(wrapper).to.have.className(styles.Detailsboard_board);
  });
});
