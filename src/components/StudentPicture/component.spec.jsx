import styles from './style.postcss';

import testImg from './test-image.png';
import defaultAvatarMaleImg from './default-avatar-male.svg';
import defaultAvatarFemaleImg from './default-avatar-female.svg';
import defaultAvatarImg from './default-avatar.svg';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import StudentPicture from './';

describe('<StudentPicture />', () => {
  it('allows to add custom classes', () => {
    const wrapper = shallow(<StudentPicture className="aClass" />);
    expect(wrapper).to.have.descendants('.aClass');
  });

  it('shows student with provided src', () => {
    const wrapper = shallow(<StudentPicture src={testImg} />);
    expect(
      wrapper.find(`.${styles.StudentPicture}`).prop('data-src')
    ).to.eql(testImg);
  });

  describe('when src is not provided', () => {
    it('shows the default image for males if Gender.MALE is provided', () => {
      const wrapper = shallow(<StudentPicture gender={StudentPicture.Gender.MALE} />);
      expect(
        wrapper.find(`.${styles.StudentPicture}`).prop('data-src')
      ).to.equal(defaultAvatarMaleImg);
    });

    it('shows the default image for females if Gender.FEMALE is provided', () => {
      const wrapper = shallow(<StudentPicture gender={StudentPicture.Gender.FEMALE} />);
      expect(
        wrapper.find(`.${styles.StudentPicture}`).prop('data-src')
      ).to.equal(defaultAvatarFemaleImg);
    });

    it('shows the default image if no gender is provided', () => {
      const wrapper = shallow(<StudentPicture />);
      expect(
        wrapper.find(`.${styles.StudentPicture}`).prop('data-src')
      ).to.equal(defaultAvatarImg);
    });
  });
});
