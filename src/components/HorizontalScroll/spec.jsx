import styles from './style.postcss';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Sinon from 'sinon';
import HorizontalScroll from './';

describe('<HorizontalScroll />', () => {
  it('renders its children', () => {
    const child = <div id="inner" />;
    expect(shallow(<HorizontalScroll>{child}</HorizontalScroll>)).toContain(child);
  });

  it('calls property onScrollReady with an instance of iScroll', (done) => {
    const onScrollReady = (scroll) => {
      expect(typeof scroll.scrollToElement).toBe('function');
      done();
    };

    mount(<HorizontalScroll onScrollReady={onScrollReady}><div /></HorizontalScroll>);
  });

  it('calls iScroll.scrollToElement with the given scrollToElement parameters', (done) => {
    const scrollToElementParams = {
      selector: 'div',
      duration: 100,
      offsetX: 10,
    };

    const onScrollReady = (scroll) => {
      const oldScrollToElement = scroll.scrollToElement;
      scroll.scrollToElement = (selector, duration, offsetX, offsetY) => {  // eslint-disable-line
        expect({
          selector, duration, offsetX, offsetY,
        }).toEqual({
          offsetY: true,  // `offsetX` and `offsetY` default to true (centre in viewport)
          ...scrollToElementParams,
        });
        scroll.scrollToElement = oldScrollToElement;  // eslint-disable-line
        done();
      };
    };

    mount(<HorizontalScroll onScrollReady={onScrollReady}
        scrollToElement={scrollToElementParams}><div /></HorizontalScroll>);
  });

  it('sets the __scrolling styles while in the isScrolling state', () => {
    const wrapper = shallow(<HorizontalScroll><div /></HorizontalScroll>);
    expect(wrapper).to.not.have.descendants(`.${styles.__scrolling}`);
    wrapper.setState({ isScrolling: true });
    expect(wrapper).to.have.descendants(`.${styles.__scrolling}`);
  });

  it('goes into isScrolling state while scrolling', () => {
    const spy = Sinon.spy(HorizontalScroll.prototype, 'setState');
    const wrapper = shallow(<HorizontalScroll><div /></HorizontalScroll>);

    expect(wrapper.find(`.${styles.HorizontalScroll_iScroll}`).prop('onBeforeScrollStart')).toBe(wrapper.instance()._onBeforeScrollStart);

    wrapper.instance()._onBeforeScrollStart();

    expect(spy.args[0]).toEqual([{ isScrolling: true }]);

    HorizontalScroll.prototype.setState.restore();
  });
});
