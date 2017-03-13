import testImg from './test-image.png';
import defaultAvatarMaleImg from './default-avatar-male.svg';
import defaultAvatarFemaleImg from './default-avatar-female.svg';
import defaultAvatarImg from './default-avatar.svg';

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import AdultPicture from './';
import Avatar from 'components/Avatar';

describe('<AdultPicture />', () => {
  it('exposes Gender from Avatar', () => {
    expect(AdultPicture.Gender).to.equal(Avatar.Gender);
  });

  it('passes properties properly to Avatar', () => {
    const wrapper = shallow(<AdultPicture src={testImg} className="aClass" />);
    const avatar = wrapper.find(Avatar);
    expect(avatar).to.have.prop('className', 'aClass');
    expect(avatar).to.have.prop('default', defaultAvatarImg);
    expect(avatar).to.have.prop('defaultMale', defaultAvatarMaleImg);
    expect(avatar).to.have.prop('defaultFemale', defaultAvatarFemaleImg);
    expect(avatar).to.have.prop('src', testImg);
  });
});
