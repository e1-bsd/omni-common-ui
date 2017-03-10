import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Icon from './';
import icons from './icons';

describe('<Icon />', () => {
  it('renders the content of the SVG file into the DOM', () => {
    const iconId = 'magnifying-glass';
    const wrapper = shallow(<Icon id={iconId} />);
    expect(wrapper).to.contain(icons.get(iconId));
  });
});
