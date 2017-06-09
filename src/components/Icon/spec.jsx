import React from 'react';
import { shallow } from 'enzyme';
import Icon from './';
import icons from './icons';

test('renders the content of the SVG file into the DOM', () => {
  const iconId = 'magnifying-glass';
  const wrapper = shallow(<Icon id={iconId} />);
  expect(wrapper.contains(icons.get(iconId))).toBe(true);
});

test('allows passing className down to the inline SVG component', () => {
  const iconId = 'magnifying-glass';
  const wrapper = shallow(<Icon id={iconId} className="custom-class" />);
  expect(wrapper.hasClass('custom-class')).toBe(true);
});

test('allows setting an onClick event', () => {
  const onClick = jest.fn();
  const wrapper = shallow(<Icon id="burger" onClick={onClick} />);
  wrapper.simulate('click');
  expect(onClick).toHaveBeenCalled();
});

test('allows setting a title attribute to the icon', () => {
  const wrapper = shallow(<Icon id="burger" title="Some title" />);
  expect(wrapper.find('[title="Some title"]')).toHaveLength(1);
});
