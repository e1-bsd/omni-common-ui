import testImg from './test-image.png';
import defaultAvatarMaleImg from './default-avatar-male.svg';
import defaultAvatarFemaleImg from './default-avatar-female.svg';
import defaultAvatarImg from './default-avatar.svg';

import React from 'react';
import { shallow } from 'enzyme';
import { StudentPicture } from './';
import Avatar from 'components/Avatar';

test.only('passes properties properly to Avatar', () => {
  const wrapper = shallow(<StudentPicture src={testImg} className="aClass" />);
  const avatar = wrapper.find(Avatar);
  expect(avatar.prop('className')).toBe('aClass');
  expect(avatar.prop('default')).toBe(defaultAvatarImg);
  expect(avatar.prop('defaultMale')).toBe(defaultAvatarMaleImg);
  expect(avatar.prop('defaultFemale')).toBe(defaultAvatarFemaleImg);
  expect(avatar.prop('src')).toBe(testImg);
});
