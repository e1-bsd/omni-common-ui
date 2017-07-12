import React from 'react';
import { shallow } from 'enzyme';
import Avatar from './';
import generateUserInitialsAvatarSvgUri from './generateUserInitialsAvatarSvg';

const bloggsInitialsAvatarUri = generateUserInitialsAvatarSvgUri('Joe', 'Bloggs');
const unknownInitialsAvatarUri = generateUserInitialsAvatarSvgUri('?', '?');
const redInitialsAvatarUri = generateUserInitialsAvatarSvgUri('Kelly', '?', '#DE4C4C', 'white');

let props;

beforeEach(() => {
  props = {
    src: 'fake-src',
    default: 'fake-default',
    defaultMale: 'fake-default-male',
    defaultFemale: 'fake-default-female',
  };
});

test('allows to add custom classes', () => {
  const wrapper = shallow(<Avatar className="aClass" />);
  expect(wrapper.find('.aClass')).toHaveLength(1);
});

test('shows provided src', () => {
  const wrapper = shallow(<Avatar src="fake-src" />);
  expect(wrapper.prop('style').backgroundImage).toBe('url("fake-src")');
});

test('assigns two background images, in case the src is broken', () => {
  const wrapper = shallow(<Avatar {...props} />);
  expect(wrapper.prop('style').backgroundImage).toBe('url("fake-src"), url("fake-default")');
});

describe('when src is not provided', () => {
  beforeEach(() => {
    props.src = undefined;
  });

  test('shows the default image for males', () => {
    const wrapper = shallow(<Avatar {...props} gender="male" />);
    expect(wrapper.prop('style').backgroundImage).toBe('url("fake-default-male")');
  });

  test('shows the default image for females', () => {
    const wrapper = shallow(<Avatar {...props} gender="female" />);
    expect(wrapper.prop('style').backgroundImage).toBe('url("fake-default-female")');
  });

  test('shows the default image if no gender is provided', () => {
    const wrapper = shallow(<Avatar {...props} />);
    expect(wrapper.prop('style').backgroundImage).toBe('url("fake-default")');
  });

  describe('shows an SVG-based avatar containing the users initials (when enabled via prop)', () => {
    test('happy path', () => {
      const wrapper = shallow(<Avatar {...props}
          userFirstName="Joe"
          userLastName="Bloggs"
          displayUserInitialsAsDefaultAvatar />);
      expect(wrapper.prop('style').backgroundImage).toBe(`url("${bloggsInitialsAvatarUri}")`);
    });

    test('happy path - colour spec correctness check', () => {
      const wrapper = shallow(<Avatar {...props}
          userFirstName="Kelly"
          displayUserInitialsAsDefaultAvatar />);
      expect(wrapper.prop('style').backgroundImage).toBe(`url("${redInitialsAvatarUri}")`);
    });

    test('containing "??" when user name is blank', () => {
      const wrapper = shallow(<Avatar {...props}
          userFirstName=""
          userLastName=""
          displayUserInitialsAsDefaultAvatar />);
      expect(wrapper.prop('style').backgroundImage).toBe(`url("${unknownInitialsAvatarUri}")`);
    });

    test('containing "??" when user name is absent', () => {
      const wrapper = shallow(<Avatar {...props}
          displayUserInitialsAsDefaultAvatar />);
      expect(wrapper.prop('style').backgroundImage).toBe(`url("${unknownInitialsAvatarUri}")`);
    });

    test('containing "??" when user name is a non-string value', () => {
      const wrapper = shallow(<Avatar {...props}
          userFirstName={null}
          userLastName={0}
          displayUserInitialsAsDefaultAvatar />);
      expect(wrapper.prop('style').backgroundImage).toBe(`url("${unknownInitialsAvatarUri}")`);
    });
  });
});
