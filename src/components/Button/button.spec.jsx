import styles from './style.postcss';

import React from 'react';
import { Link } from 'react-router';
import { shallow, mount } from 'enzyme';
import Button from './';
import { Type } from './type';

jest.mock('react-router', () => ({ Link: (props) => <div {...props} /> }));

beforeEach(() => {
  jest.clearAllTimers();
});

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

test('renders an <a> when linkTo is provided but disabled=true', () => {
  const wrapper = shallow(<Button linkTo="/" disabled />);
  expect(wrapper.find(Link)).toHaveLength(0);
  expect(wrapper.find('a')).toHaveLength(1);
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
  testButtonClick();

  describe('when it renders as an <a />', () => {
    testButtonClick({ linkHref: '/' });
  });

  describe('when it renders as an <Link />', () => {
    testButtonClick({ linkTo: '/' });
  });
});

function testButtonClick(props = {}) {
  test('calls onClick', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button {...props} onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  test('does not fail if onClick is not provided', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(() => wrapper.simulate('click')).not.toThrowError();
  });

  test('does nothing if it is disabled', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button {...props} onClick={onClick} disabled />);
    wrapper.simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  test('does not fail if the component is unmounted while active', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Button {...props} onClick={onClick} onClickActiveClassAddDelay={0} />);
    wrapper.simulate('click');
    jest.runTimersToTime(100);
    wrapper.unmount();
    expect(() => jest.runOnlyPendingTimers(1000)).not.toThrow();
  });

  test('sets the .__active class after 100ms by default', () => {
    jest.useFakeTimers();

    const wrapper = mount(<Button {...props} onClick={() => {}} />);
    wrapper.simulate('click');
    jest.runTimersToTime(100);

    expect(wrapper.find(`.${styles.__active}`)).toHaveLength(1);
  });

  test('sets the .__active class after a custom amount of time if onClickActiveClassAddDelay is provided', () => {
    jest.useFakeTimers();

    const wrapper = mount(<Button {...props}
        onClick={() => {}}
        onClickActiveClassAddDelay={500} />);
    wrapper.simulate('click');
    jest.runTimersToTime(100);
    expect(wrapper.find(`.${styles.__active}`)).toHaveLength(0);
    jest.runTimersToTime(400);
    expect(wrapper.find(`.${styles.__active}`)).toHaveLength(1);
  });

  test('removes the .__active class when onClick promise is resolved', async () => {
    jest.useFakeTimers();

    let resolve;
    const promise = new Promise((r) => { resolve = r; });
    const wrapper = mount(<Button {...props} onClick={() => promise} />);

    wrapper.simulate('click');
    jest.runTimersToTime(100);
    expect(wrapper.find(`.${styles.__active}`)).toHaveLength(1);

    resolve();
    await promise;

    expect(wrapper.find(`.${styles.__active}`)).toHaveLength(0);
  });

  test('removes the .__active class when onClick promise is rejected', async () => {
    jest.useFakeTimers();

    let reject;
    const promise = new Promise((_, r) => { reject = r; });
    const wrapper = mount(<Button {...props} onClick={() => promise} />);

    wrapper.simulate('click');
    jest.runTimersToTime(100);
    expect(wrapper.find(`.${styles.__active}`)).toHaveLength(1);

    reject();
    try { await promise; } catch (e) { /**/ }

    expect(wrapper.find(`.${styles.__active}`)).toHaveLength(0);
  });
}
