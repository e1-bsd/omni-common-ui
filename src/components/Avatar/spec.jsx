import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Avatar from './';

describe('<Avatar />', () => {
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

    it('shows the default image for males if Gender.MALE is provided', () => {
      const wrapper = shallow(<Avatar {...props} gender={Avatar.Gender.MALE} />);
      expect(wrapper).to.have.style('background-image', 'url("fake-default-male")');
    });

    it('shows the default image for females if Gender.FEMALE is provided', () => {
      const wrapper = shallow(<Avatar {...props} gender={Avatar.Gender.FEMALE} />);
      expect(wrapper).to.have.style('background-image', 'url("fake-default-female")');
    });

    it('shows the default image if no gender is provided', () => {
      const wrapper = shallow(<Avatar {...props} />);
      expect(wrapper).to.have.style('background-image', 'url("fake-default")');
    });
  });
});
