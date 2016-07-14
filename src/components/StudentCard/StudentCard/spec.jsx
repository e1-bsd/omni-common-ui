import profileStyles from '../Profile/style.postcss';
import contentStyles from '../Content/style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { StudentCard, Card } from 'omni-common-ui';

describe('StudentCard', () => {
  it('renders its children', () => {
    const wrapper = shallow(<StudentCard><div id="innerContent" /></StudentCard>);
    expect(wrapper.contains(<div id="innerContent" />)).to.be.true;
  });
  it('renders a Card descendent', () => {
    const wrapper = shallow(<StudentCard />);
    expect(wrapper).to.have.descendants(Card);
  });
  it('sets the given status accent color class when provided', () => {
    const wrapper = shallow(<StudentCard statusAccentColor="grey" />);
    expect(wrapper).to.contain(<Card withLeftPaddedContentArea={false} statusAccentColor="grey" />);
  });
  it('sets the left-pad on the StudentCard.Content when enabled', () => {
    const wrapper = mount(
      <StudentCard withLeftPaddedContentArea statusAccentColor="grey">
        <StudentCard.Content />
      </StudentCard>
    );
    expect(
      wrapper.find(StudentCard.Content)
    ).to.have.className(contentStyles.__withLeftPadding);
  });
  it('does not left-pad the StudentCard.Content when there is no status accent', () => {
    const wrapper = mount(
      <StudentCard><StudentCard.Content /></StudentCard>
    );
    expect(
      wrapper.find(StudentCard.Content)
    ).to.not.have.className(contentStyles.__withLeftPadding);
  });
  it('does not left-pad the StudentCard.Content with a status accent but left-pad disabled', () => {
    const wrapper = mount(
      <StudentCard statusAccentColor="grey"><StudentCard.Content /></StudentCard>
    );
    expect(
      wrapper.find(StudentCard.Content)
    ).to.not.have.className(contentStyles.__withLeftPadding);
  });
  it('renders a StudentCard.Profile when provided', () => {
    const wrapper = shallow(<StudentCard><StudentCard.Profile /></StudentCard>);
    expect(wrapper).to.contain(<StudentCard.Profile />);
  });
  it('renders a StudentCard.Content when provided', () => {
    const wrapper = shallow(<StudentCard><StudentCard.Content /></StudentCard>);
    expect(wrapper).to.contain(<StudentCard.Content />);
  });
  it('renders a StudentCard.Profile without separator class by default', () => {
    const wrapper = mount(<StudentCard><StudentCard.Profile /></StudentCard>);
    expect(
      wrapper.find(Card.Content).children()
    ).to.not.have.className(profileStyles.__separated);
  });
  it('renders a StudentCard.Profile with separator class (withSeparatorLine provided)', () => {
    const wrapper = mount(<StudentCard withSeparatorLine><StudentCard.Profile /></StudentCard>);
    expect(
      wrapper.find(Card.Content).children()
    ).to.have.className(profileStyles.__separated);
  });
});
