import styles from './style.postcss';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import StudentPicture from 'components/StudentPicture';
import Profile from './';

describe('StudentCard.Profile', () => {
  it('renders a StudentPicture with the given attributes', () => {
    const wrapper = shallow(<Profile avatarUrl="url" gender={1} />);
    expect(wrapper)
    .to.contain(
      <StudentPicture src="url" gender={1} className={styles.StudentCard_profile_image} />
    );
  });
  it('renders profile info with the given name', () => {
    const wrapper = shallow(<Profile name="John" surname="Doe" />);
    expect(
      wrapper.find(`.${styles.StudentCard_profile_name}`)
    ).to.have.text(
      'John'
    );
  });
  it('renders profile info with the given surname', () => {
    const wrapper = shallow(<Profile name="John" surname="Doe" />);
    expect(
      wrapper.find(`.${styles.StudentCard_profile_surname}`)
    ).to.have.text(
      'Doe'
    );
  });
});
