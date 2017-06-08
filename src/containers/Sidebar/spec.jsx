import styles from './style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Sidebar from './';

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
    onExpand: jest.fn(),
    onCollapse: jest.fn(),
  };
});

test('renders nothing if no items available', () => {
  expect(shallow(<Sidebar />).html()).toBe(null);
});

test('renders collapsed view by default', () => {
  expect(mount(<Sidebar {...props} />).find(`.${styles.Sidebar_expanded}`)).toHaveLength(0);
});

test('calls onExpand when clicking on it', () => {
  const wrapper = mount(<Sidebar {...props} />);
  wrapper.simulate('click');
  expect(props.onExpand).toHaveBeenCalled();
});

describe('when expanded', () => {
  const mountAndClick = () => {
    const wrapper = mount(<Sidebar {...props} />);
    wrapper.simulate('click');
    return wrapper;
  };

  beforeEach(() => {
    props.expanded = true;
  });

  test('renders as expanded', () => {
    const wrapper = mount(<Sidebar {...props} />);
    expect(wrapper.find(`.${styles.Sidebar_expanded}`)).toHaveLength(1);
  });

  test('renders items', () => {
    const wrapper = mountAndClick();
    const items = wrapper.find(`.${styles.Sidebar_item}`);
    expect(items).toHaveLength(3);
    expect(items.at(0).text()).toBe('Link 1');
    expect(items.at(1).text()).toBe('Link 2');
    expect(items.at(2).text()).toBe('Current path');
  });

  test('calls onCollapse if the user clicks outside', () => {
    mountAndClick();
    document.body.dispatchEvent(new Event('click'));
    expect(props.onCollapse).toHaveBeenCalled();
  });

  test('calls onCollapse if the user taps outside', () => {
    mountAndClick();
    document.body.dispatchEvent(new Event('touchstart'));
    expect(props.onCollapse).toHaveBeenCalled();
  });

  test('allows deeper routes to override configuration', () => {
    props.routes.push({ sidebar: { '/link/1': { text: 'My link' } } });
    const wrapper = mountAndClick();
    const items = wrapper.find(`.${styles.Sidebar_item}`);
    expect(items).toHaveLength(3);
    expect(items.at(0).text()).toBe('My link');
  });

  test('allows deeper routes to remove an item', () => {
    props.routes.push({ sidebar: { '/link/1': undefined } });
    const wrapper = mountAndClick();
    const items = wrapper.find(`.${styles.Sidebar_item}`);
    expect(items).toHaveLength(2);
    expect(items.at(0).text()).toBe('Link 2');
  });

  test('renders items according to their order property', () => {
    props.routes[0].sidebar['/link/1'].order = 3;
    props.routes[0].sidebar['/link/2'].order = 1;
    props.routes[0].sidebar['/current/path'].order = 2;
    const wrapper = mountAndClick();
    const items = wrapper.find(`.${styles.Sidebar_item}`);
    expect(items).toHaveLength(3);
    expect(items.at(0).text()).toBe('Link 2');
    expect(items.at(1).text()).toBe('Current path');
    expect(items.at(2).text()).toBe('Link 1');
  });
});
