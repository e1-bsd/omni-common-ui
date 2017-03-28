import styles from './style.postcss';
import React from 'react';
import HorizontalScroll from './';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Sinon from 'sinon';

describe('<HorizontalScroll />', () => {
  it('renders its children', () => {
    const child = <div id="inner" />;
    expect(shallow(<HorizontalScroll>{child}</HorizontalScroll>)).to.contain(child);
  });

  it('calls property onScrollReady with an instance of iScroll', (done) => {
    const onScrollReady = (scroll) => {
      expect(scroll.scrollToElement).to.be.a('function');
      done();
    };

    mount(<HorizontalScroll onScrollReady={onScrollReady}><div /></HorizontalScroll>);
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

    expect(wrapper.find(`.${styles.HorizontalScroll_iScroll}`).prop('onBeforeScrollStart'))
        .to.equal(wrapper.instance()._onBeforeScrollStart);

    wrapper.instance()._onBeforeScrollStart();

    expect(spy.args[0]).to.eql([{
      isScrolling: true,
      isAtScrollMinX: false,
      isAtScrollMaxX: false,
    }]);

    HorizontalScroll.prototype.setState.restore();
  });

  context('when the content is big enough to have a scroll', () => {
    const child = <div id="inner" style={{ width: 1000 }} />;
    const buildComponent = (onScrollReady, hasClickableAreasOnTheSides = false) =>
      <div style={{ width: 100 }}>
        <HorizontalScroll onScrollReady={onScrollReady}
            hasClickableAreasOnTheSides={hasClickableAreasOnTheSides}>
          {child}
        </HorizontalScroll>
      </div>;

    it('shows a navigation area on the right side if hasClickableAreasOnTheSides=true', () => {
      expect(mount(buildComponent(undefined, true))).to.have.descendants(`.${styles.__visible}`);
    });

    it('does not show a navigation area on the right side if hasClickableAreasOnTheSides=false', () => {
      expect(mount(buildComponent())).to.not.have.descendants(`.${styles.__visible}`);
    });
  });

  context('when the content is not big enough to have a scroll', () => {
    const child = <div id="inner" style={{ width: 100 }} />;
    const buildComponent = () => <div style={{ width: 1000 }}>
      <HorizontalScroll>{child}</HorizontalScroll>
    </div>;

    it('does not show any navigation area on the sides', () => {
      expect(shallow(buildComponent())).to.not.have.descendants(`.${styles.__visible}`);
    });
  });
});
