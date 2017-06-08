import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import { DetailsBoard } from './';

test('renders itself with title and value', () => {
  const wrapper = shallow(<DetailsBoard title="test" value="test" />);
  expect(wrapper.hasClass(styles.Detailsboard_board)).toBe(true);
});
