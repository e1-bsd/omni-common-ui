import styles from './style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';
import HorizontalScroll from './';
import ReactIScrollMock from 'react-iscroll';

jest.mock('iscroll', () => jest.fn());
jest.mock('react-iscroll', () => {
  /* eslint-disable global-require */
  const { PureComponent } = require('react');

  class Mock extends PureComponent {
    withIScroll(_, callback) {
      // eslint-disable-next-line new-cap, react/prop-types, react/no-find-dom-node
      callback({ scrollToElement: Mock.scrollToElement });
    }

    render() {
      return null;
    }
  }

  Mock.scrollToElement = jest.fn();

  return Mock;
});

beforeEach(() => {
  jest.resetAllMocks();
});

test('renders its children', () => {
  const child = <div id="inner" />;
  expect(shallow(<HorizontalScroll>{child}</HorizontalScroll>).contains(child)).toBe(true);
});

test('calls property onScrollReady with an instance of iScroll', (done) => {
  expect.assertions(1);
  const onScrollReady = jest.fn(() => {
    expect(onScrollReady).toHaveBeenCalled();
    done();
  });

  mount(<HorizontalScroll onScrollReady={onScrollReady}><div /></HorizontalScroll>);
});

test('calls iScroll.scrollToElement with the given scrollToElement parameters', (done) => {
  expect.assertions(1);
  const scrollToElementParams = {
    selector: 'div',
    duration: 100,
    offsetX: 10,
  };

  ReactIScrollMock.scrollToElement = (selector, duration, offsetX, offsetY) => {  // eslint-disable-line
    expect({ selector, duration, offsetX, offsetY })
        .toEqual({
          offsetY: true,  // `offsetX` and `offsetY` default to true (centre in viewport)
          ...scrollToElementParams,
        });
    done();
  };

  mount(<HorizontalScroll scrollToElement={scrollToElementParams}><div /></HorizontalScroll>);
});

test('sets the __scrolling styles while in the isScrolling state', () => {
  const wrapper = shallow(<HorizontalScroll><div /></HorizontalScroll>);
  expect(wrapper.find(`.${styles.__scrolling}`)).toHaveLength(0);
  wrapper.setState({ isScrolling: true });
  expect(wrapper.find(`.${styles.__scrolling}`)).toHaveLength(1);
});

test('goes into isScrolling state while scrolling', () => {
  const spy = jest.spyOn(HorizontalScroll.prototype, 'setState');
  const wrapper = shallow(<HorizontalScroll><div /></HorizontalScroll>);

  expect(wrapper.find(`.${styles.HorizontalScroll_iScroll}`).prop('onBeforeScrollStart')).toBe(wrapper.instance()._onBeforeScrollStart);

  wrapper.instance()._onBeforeScrollStart();

  expect(spy).toHaveBeenCalledWith({ isScrolling: true });

  spy.mockRestore();
});
