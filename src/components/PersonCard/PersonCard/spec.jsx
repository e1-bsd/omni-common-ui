import styles from './style.postcss';
import profileStyles from '../Profile/style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import PersonCard from 'components/PersonCard';
import Card from 'components/Card';
import classnames from 'classnames';

describe('PersonCard', () => {
  it('renders its children', () => {
    const wrapper = shallow(<PersonCard><div id="innerContent" /></PersonCard>);
    expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
  });

  it('renders a Card descendent', () => {
    const wrapper = shallow(<PersonCard />);
    expect(wrapper).to.have.descendants(Card);
  });

  it('adds the borderless prop to Card when borderless prop is provided', () => {
    const wrapper = shallow(<PersonCard borderless />);
    expect(wrapper.find(Card).prop('borderless')).to.be.true;
  });

  it('sets the given status accent color class when provided', () => {
    const wrapper = shallow(<PersonCard statusAccentColor="grey" />);
    expect(
      wrapper.find('div')
    ).to.have.prop('className', classnames(styles.PersonCard, styles.__grey));
  });

  it('renders a PersonCard.Profile when provided', () => {
    const wrapper = shallow(<PersonCard><PersonCard.Profile /></PersonCard>);
    expect(wrapper).to.contain(<PersonCard.Profile />);
  });

  it('renders a PersonCard.Content when provided', () => {
    const wrapper = shallow(<PersonCard><PersonCard.Content /></PersonCard>);
    expect(wrapper).to.contain(<PersonCard.Content />);
  });

  it('renders a PersonCard.Profile without separator class by default', () => {
    const wrapper = mount(<PersonCard><PersonCard.Profile /></PersonCard>);
    expect(
      wrapper.find(Card.Content).children()
    ).to.not.have.className(profileStyles.__separated);
  });

  it('renders a PersonCard.Profile with separator class (withSeparatorLine provided)', () => {
    const wrapper = mount(<PersonCard withSeparatorLine><PersonCard.Profile /></PersonCard>);
    expect(
      wrapper.find(Card.Content).children()
    ).to.have.className(profileStyles.__separated);
  });
});
