import styles from './style.postcss';
import React, { PureComponent } from 'react';

import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import classnames from 'classnames';
import is from 'is_js';

const baseOptions = {
  deceleration: 0.01,
  bounce: false,
  scrollX: true,
  scrollY: false,
  scrollbars: true,
  interactiveScrollbars: true,
  eventPassthrough: true,
  keyBindings: true,
  mouseWheel: true,
};

class HorizontalScroll extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isScrolling: false };
    this._onBeforeScrollStart = this._onBeforeScrollStart.bind(this);
    this._onScrollCancelOrEnd = this._onScrollCancelOrEnd.bind(this);
    this._onScrollRefresh = this._onScrollRefresh.bind(this);
  }

  componentDidMount() {
    const { onScrollReady } = this.props;
    const isOnScrollReadySet = is.function(onScrollReady);
    if (isOnScrollReadySet) {
      this.hostNode.withIScroll(true, (scroll) => {
        isOnScrollReadySet && onScrollReady(scroll);
      });
    }
    this._scrollToElement();
  }

  componentDidUpdate(prevProps, prevState) {
    // if update was a user scroll don't do the auto scroll to element
    if (this.state.isScrolling !== prevState.isScrolling) return;
    this._scrollToElement();
  }

  _scrollToElement() {
    const { scrollToElement } = this.props;
    const isScrollToElementSet = is.object(scrollToElement);
    if (isScrollToElementSet) {
      this.hostNode.withIScroll(true, (scroll) => {
        const { selector, duration, offsetX, offsetY, easing } = scrollToElement;
        scroll.scrollToElement(
            selector,
            duration,
            is.number(offsetX) ? offsetX : true,
            is.number(offsetY) ? offsetY : true,
            easing);
      });
    }
  }

  _onBeforeScrollStart() {
    this.setState({ isScrolling: true });
  }

  _onScrollCancelOrEnd() {
    this.setState({ isScrolling: false });
  }

  _onScrollRefresh(_iScroll) {
    this.setState({ hasScroll: ! (_iScroll.x === _iScroll.maxScrollX && _iScroll.x === 0) });
  }

  render() {
    const { className, innerClassName } = this.props;
    const iScrollClasses = classnames(styles.HorizontalScroll_iScroll, innerClassName, {
      [styles.__hasScroll]: !! this.state.hasScroll,
      [styles.__scrolling]: !! this.state.isScrolling,
    });

    return <div className={classnames(styles.HorizontalScroll, className)}>
      <ReactIScroll className={iScrollClasses}
          iScroll={iScroll}
          options={baseOptions}
          ref={(node) => { this.hostNode = node; }}
          onBeforeScrollStart={this._onBeforeScrollStart}
          onScrollCancel={this._onScrollCancelOrEnd}
          onScrollEnd={this._onScrollCancelOrEnd}
          onRefresh={this._onScrollRefresh}>
        {this.props.children}
      </ReactIScroll>
    </div>;
  }
}

HorizontalScroll.propTypes = {
  className: React.PropTypes.string,
  innerClassName: React.PropTypes.string,
  children: React.PropTypes.node,
  onScrollReady: React.PropTypes.func,
  scrollToElement: React.PropTypes.shape({
    selector: React.PropTypes.string.isRequired,
    duration: React.PropTypes.number,
    offsetX: React.PropTypes.number,
    offsetY: React.PropTypes.number,
    easing: React.PropTypes.object,
  }),
};

export default HorizontalScroll;
