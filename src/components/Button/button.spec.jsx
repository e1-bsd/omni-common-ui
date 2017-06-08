import styles from './style.postcss';

import React from 'react';
import { Link } from 'react-router';
import { shallow, mount } from 'enzyme';
import Sinon from 'sinon';
import Button from './';
import { Type } from './type';

test('contains Type object', () => {
  expect(Button.Type).toBe(Type);
});

test('renders its children', () => {
  const wrapper = shallow(<Button><div id="innerContent" /></Button>);
  expect(wrapper.contains(<div id="innerContent" />)).toBe(true);
});

test('renders a Link when linkTo is provided', () => {
  const wrapper = shallow(<Button linkTo="/" />);
  expect(wrapper.find(Link)).toHaveLength(1);
});

test('will open link in a new Tab if newTab is provided', () => {
  const wrapper = shallow(<Button linkHref="/" newTab />);
  expect(wrapper.prop('target')).toBe('_blank');
});

test('thows error if invalid type is passed', () => {
  expect(() => shallow(<Button type="faketype" />)).toThrowError();
});

test('applies proper styles if Type.primary is passed', () => {
  const wrapper = shallow(<Button type={Type.primary} />);
  expect(wrapper.find(`.${styles.__primary}`)).toHaveLength(1);
});

test('applies proper styles if Type.default is passed', () => {
  const wrapper = shallow(<Button type={Type.default} />);
  expect(wrapper.find(`.${styles.__default}`)).toHaveLength(1);
});

test('uses Type.default if no type is provided', () => {
  const wrapper = shallow(<Button />);
  expect(wrapper.find(`.${styles.__default}`).length).toBe(1);
});

test('uses block styles if block property is provided', () => {
  const wrapper = shallow(<Button block />);
  expect(wrapper.find(`.${styles.__block}`).length).toBe(1);
});

test('uses block styles on Link and itself if block propery is provided', () => {
  const wrapper = shallow(<Button linkTo="/" block />);
  expect(wrapper.find(`.${styles.__block}`).length).toBe(2);
});

test('applies custom attrs when provided', () => {
  const wrapper = shallow(<Button attrs={{ type: 'submit' }} />);
  expect(wrapper.find('button[type="submit"]').length).toBe(1);
});

describe('when clicked', () => {
  test('calls onClick', () => {
    const onClick = Sinon.spy();
    const wrapper = shallow(<Button onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick.called).toBe(true);
  });

  test('sets the .__active class after 100ms', () => {
    jest.useFakeTimers();

    const wrapper = mount(<Button onClick={() => {}} />);
    wrapper.simulate('click');
    jest.runOnlyPendingTimers();

    expect(wrapper.find(`.${styles.__active}`)).toHaveLength(1);
  });

  test('removes the .__active class when onClick promise is resolved', () => {
    const promise = new Promise((resolve) => resolve());
    const wrapper = mount(<Button onClick={promise} onClickActiveClassAddDelay={0} />);
    wrapper.simulate('click');

    expect(wrapper.find(`.${styles.__active}`)).toHaveLength(0);
  });

  test('does not fail if onClick is not provided', () => {
    const wrapper = shallow(<Button />);
    expect(() => wrapper.simulate('click')).not.toThrowError();
  });

  test('does nothing if it is disabled', () => {
    const onClick = Sinon.spy();
    const wrapper = shallow(<Button onClick={onClick} disabled />);
    wrapper.simulate('click');
    expect(onClick.called).toBe(false);
  });
});
