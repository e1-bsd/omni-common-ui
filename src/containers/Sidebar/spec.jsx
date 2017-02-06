import styles from './style.postcss';

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Sidebar from './';

describe('<Sidebar />', () => {
  let props;

  beforeEach(() => {
    props = {
      location: { pathname: '/current/path' },
      routes: [
        {
          sidebar: {
            '/link/1': { text: 'Link 1' },
            '/link/2': { text: 'Link 2' },
            '/current/path': { text: 'Current path' },
          },
        },
      ],
    };
  });

  it('renders nothing if no items available', () => {
    expect(shallow(<Sidebar />)).to.be.empty;
  });

  it('renders collapsed view by default', () => {
    expect(mount(<Sidebar {...props} />)).to.not.have.descendants(`.${styles.Sidebar_expanded}`);
  });

  it('allows to be expanded by clicking on it', () => {
    const wrapper = mount(<Sidebar {...props} />);
    wrapper.simulate('click');
    expect(wrapper).to.have.descendants(`.${styles.Sidebar_expanded}`);
  });

  context('when expanded', () => {
    const mountAndClick = () => {
      const wrapper = mount(<Sidebar {...props} />);
      wrapper.simulate('click');
      return wrapper;
    };

    it('renders items', () => {
      const wrapper = mountAndClick();
      const items = wrapper.find(`.${styles.Sidebar_item}`);
      expect(items).to.have.length(3);
      expect(items.at(0)).to.have.text('Link 1');
      expect(items.at(1)).to.have.text('Link 2');
      expect(items.at(2)).to.have.text('Current path');
    });

    it('closes itself if the user clicks outside', () => {
      const wrapper = mountAndClick();
      expect(wrapper).to.have.descendants(`.${styles.Sidebar_expanded}`);
      document.body.dispatchEvent(new Event('click'));
      expect(wrapper).to.not.have.descendants(`.${styles.Sidebar_expanded}`);
    });

    it('closes itself if the user taps outside', () => {
      const wrapper = mountAndClick();
      expect(wrapper).to.have.descendants(`.${styles.Sidebar_expanded}`);
      document.body.dispatchEvent(new Event('touchstart'));
      expect(wrapper).to.not.have.descendants(`.${styles.Sidebar_expanded}`);
    });

    it('allows deeper routes to override configuration', () => {
      props.routes.push({ sidebar: { '/link/1': { text: 'My link' } } });
      const wrapper = mountAndClick();
      const items = wrapper.find(`.${styles.Sidebar_item}`);
      expect(items).to.have.length(3);
      expect(items.at(0)).to.have.text('My link');
    });

    it('allows deeper routes to remove an item', () => {
      props.routes.push({ sidebar: { '/link/1': undefined } });
      const wrapper = mountAndClick();
      const items = wrapper.find(`.${styles.Sidebar_item}`);
      expect(items).to.have.length(2);
      expect(items.at(0)).to.have.text('Link 2');
    });

    it('renders items according to their order property', () => {
      props.routes[0].sidebar['/link/1'].order = 3;
      props.routes[0].sidebar['/link/2'].order = 1;
      props.routes[0].sidebar['/current/path'].order = 2;
      const wrapper = mountAndClick();
      const items = wrapper.find(`.${styles.Sidebar_item}`);
      expect(items).to.have.length(3);
      expect(items.at(0)).to.have.text('Link 2');
      expect(items.at(1)).to.have.text('Current path');
      expect(items.at(2)).to.have.text('Link 1');
    });
  });
});
