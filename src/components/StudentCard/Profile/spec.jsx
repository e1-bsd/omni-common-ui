import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import { shallow } from 'enzyme';

import StudentPicture from 'components/StudentPicture';
import Profile from './';

describe('StudentCard.Profile', () => {
  test('renders a StudentPicture with the given attributes', () => {
    const wrapper = shallow(<Profile avatarUrl="url" gender={1} />);
    expect(wrapper).toContain(<StudentPicture src="url"
        gender={1}
        className={styles.StudentCard_profile_image} />);
  });
  test('renders a bigger StudentPicture with the withBiggerAvatar prop', () => {
    const wrapper = shallow(<Profile withBiggerAvatar avatarUrl="url" gender={1} />);
    expect(wrapper).toContain(<StudentPicture src="url"
        gender={1}
        className={classnames(styles.StudentCard_profile_image, styles.__bigger)} />);
  });
  test('renders profile info with the given name', () => {
    const wrapper = shallow(<Profile name="John" surname="Doe" localName="王呆呆" />);
    expect(
      wrapper.find(`.${styles.StudentCard_profile_name}`)
    ).to.have.text(
      'John Doe'
    );
  });
  test('renders profile info with the given surname', () => {
    const wrapper = shallow(<Profile name="John" surname="Doe" localName="王呆呆" />);
    expect(
      wrapper.find(`.${styles.StudentCard_profile_localName}`)
    ).to.have.text(
      '王呆呆'
    );
  });
});
