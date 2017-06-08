import React from 'react';
import { shallow } from 'enzyme';
import Icon from './';
import icons from './icons';
import Sinon from 'sinon';

describe('<Icon />', () => {
  test('renders the content of the SVG file into the DOM', () => {
    const iconId = 'magnifying-glass';
    const wrapper = shallow(<Icon id={iconId} />);
    expect(wrapper).toContain(icons.get(iconId));
  });

  test('allows passing className down to the inline SVG component', () => {
    const iconId = 'magnifying-glass';
    const wrapper = shallow(<Icon id={iconId} className="custom-class" />);
    expect(wrapper).to.have.descendants('.custom-class');
  });

  test('allows setting an onClick event', () => {
    const onClick = Sinon.spy();
    const wrapper = shallow(<Icon id="burger" onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick.called).toBe(true);
  });

  test('allows setting a title attribute to the icon', () => {
    const wrapper = shallow(<Icon id="burger" title="Some title" />);
    expect(wrapper.find('[title="Some title"]')).toHaveLength(1);
  });
});
