import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Avatar from './';
import generateUserInitialsAvatarSvgUri from './generateUserInitialsAvatarSvg';

describe('<Avatar />', () => {
  const bloggsInitialsAvatarUri = generateUserInitialsAvatarSvgUri('Joe', 'Bloggs');
  const unknownInitialsAvatarUri = generateUserInitialsAvatarSvgUri('?', '?');
  const redInitialsAvatarUri = generateUserInitialsAvatarSvgUri('Kelly', '?', '#D8213A', 'white');

  let props;

  beforeEach(() => {
    props = {
      src: 'fake-src',
      default: 'fake-default',
      defaultMale: 'fake-default-male',
      defaultFemale: 'fake-default-female',
    };
  });

  it('allows to add custom classes', () => {
    const wrapper = shallow(<Avatar className="aClass" />);
    expect(wrapper).to.have.descendants('.aClass');
  });

  it('shows provided src', () => {
    const wrapper = shallow(<Avatar src="fake-src" />);
    expect(wrapper).to.have.style('background-image', 'url("fake-src")');
  });

  it('assigns two background images, in case the src is broken', () => {
    const wrapper = shallow(<Avatar {...props} />);
    expect(wrapper).to.have.style('background-image', 'url("fake-src"), url("fake-default")');
  });

  describe('when src is not provided', () => {
    beforeEach(() => {
      props.src = undefined;
    });

    it('shows the default image for males', () => {
      const wrapper = shallow(<Avatar {...props} gender="male" />);
      expect(wrapper).to.have.style('background-image', 'url("fake-default-male")');
    });

    it('shows the default image for females', () => {
      const wrapper = shallow(<Avatar {...props} gender="female" />);
      expect(wrapper).to.have.style('background-image', 'url("fake-default-female")');
    });

    it('shows the default image if no gender is provided', () => {
      const wrapper = shallow(<Avatar {...props} />);
      expect(wrapper).to.have.style('background-image', 'url("fake-default")');
    });

    describe(
      'shows an SVG-based avatar containing the users initials (when enabled via prop)',
      () => {
        it('happy path', () => {
          const wrapper = shallow(<Avatar {...props}
              userFirstName="Joe"
              userLastName="Bloggs"
              displayUserInitialsAsDefaultAvatar />);
          expect(wrapper).to.have.attr('style', `background-image:url("${bloggsInitialsAvatarUri}");`);
        });

        it('happy path - colour spec correctness check', () => {
          const wrapper = shallow(<Avatar {...props}
              userFirstName="Kelly"
              displayUserInitialsAsDefaultAvatar />);
          expect(wrapper).to.have.attr('style', `background-image:url("${redInitialsAvatarUri}");`);
        });

        it('containing "??" when user name is blank', () => {
          const wrapper = shallow(<Avatar {...props}
              userFirstName=""
              userLastName=""
              displayUserInitialsAsDefaultAvatar />);
          expect(wrapper).to.have.attr('style', `background-image:url("${unknownInitialsAvatarUri}");`);
        });

        it('containing "??" when user name is absent', () => {
          const wrapper = shallow(<Avatar {...props}
              displayUserInitialsAsDefaultAvatar />);
          expect(wrapper).to.have.attr('style', `background-image:url("${unknownInitialsAvatarUri}");`);
        });

        it('containing "??" when user name is a non-string value', () => {
          const wrapper = shallow(<Avatar {...props}
              userFirstName={null}
              userLastName={0}
              displayUserInitialsAsDefaultAvatar />);
          expect(wrapper).to.have.attr('style', `background-image:url("${unknownInitialsAvatarUri}");`);
        });
      }
    );
  });
});
