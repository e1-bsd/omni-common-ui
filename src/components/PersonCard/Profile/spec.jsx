import styles from './style.postcss';

import React from 'react';
import classnames from 'classnames';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import AdultPicture from 'components/AdultPicture';
import StudentPicture from 'components/StudentPicture';
import Profile from './';

describe('PersonCard.Profile', () => {
  it('renders a AdultPicture with the given attributes', () => {
    const wrapper = shallow(<Profile avatarUrl="url" gender={1} />);
    expect(wrapper)
    .to.contain(
      <AdultPicture src="url" gender={1}
          className={styles.PersonCard_profile_image} />
    );
  });
  it('renders a bigger AdultPicture with the withBiggerAvatar prop', () => {
    const wrapper = shallow(<Profile withBiggerAvatar avatarUrl="url" gender={1} />);
    expect(wrapper)
    .to.contain(
      <AdultPicture src="url" gender={1}
          className={classnames(styles.PersonCard_profile_image, styles.__bigger)} />
    );
  });
  it('renders profile info with the given name', () => {
    const wrapper = shallow(<Profile name="John" surname="Doe" localName="王呆呆" />);
    expect(
      wrapper.find(`.${styles.PersonCard_profile_name}`)
    ).to.have.text(
      'John Doe'
    );
  });
  it('renders profile info with the given surname', () => {
    const wrapper = shallow(<Profile name="John" surname="Doe" localName="王呆呆" />);
    expect(
      wrapper.find(`.${styles.PersonCard_profile_localName}`)
    ).to.have.text(
      '王呆呆'
    );
  });
  it('uses StudentPicture instead of AdultPicture if "student" prop is provided', () => {
    const wrapper = shallow(<Profile name="John" surname="Doe" localName="王呆呆" student />);
    expect(wrapper.find(StudentPicture)).to.have.length(1);
    expect(wrapper.find(AdultPicture)).to.have.length(0);
  });
});
