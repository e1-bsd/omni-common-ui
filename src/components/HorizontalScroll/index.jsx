import styles from './style.postcss';
import React, { PureComponent } from 'react';

import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import classnames from 'classnames';
import is from 'is_js';

class HorizontalScroll extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isScrolling: false,
      isAtScrollMinX: true,
      isAtScrollMaxX: false,
    };
    this._onBeforeScrollStart = this._onBeforeScrollStart.bind(this);
    this._onScrollCancelOrEnd = this._onScrollCancelOrEnd.bind(this);
    this._onScrollRefresh = this._onScrollRefresh.bind(this);
  }

  componentDidMount() {
    const { onScrollReady } = this.props;
    if (is.function(onScrollReady)) {
      this.hostNode.withIScroll(true, (scroll) => {
        onScrollReady(scroll);
      });
    }
  }

  _onBeforeScrollStart() {
    this.setState({
      isScrolling: true,
      isAtScrollMinX: false,
      isAtScrollMaxX: false,
    });
  }

  _onScrollCancelOrEnd(_iScroll) {
    const newState = {
      isScrolling: false,
      isAtScrollMinX: false,
      isAtScrollMaxX: false,
    };
    if (_iScroll.x === 0) {
      newState.isAtScrollMinX = true;
    } else if (_iScroll.x === _iScroll.maxScrollX) {
      newState.isAtScrollMaxX = true;
    }
    if (this.state.isScrolling ||
        newState.isAtScrollMinX !== this.state.isAtScrollMinX ||
        newState.isAtScrollMaxX !== this.state.isAtScrollMaxX) {
      this.setState(newState);
    }
  }

  _onScrollRefresh(_iScroll) {
    this.setState({ hasScroll: ! (_iScroll.x === _iScroll.maxScrollX && _iScroll.x === 0) });
  }

  render() {
    const baseOptions = {
      bounce: false,
      scrollX: true,
      scrollY: false,
      scrollbars: true,
      interactiveScrollbars: true,
      eventPassthrough: true,
      keyBindings: true,
      mouseWheel: true,
    };
    const { className, innerClassName } = this.props;
    const options = Object.assign({}, baseOptions, this.props.options || {});
    return <div className={classnames(styles.HorizontalScroll, className)}>
      <ReactIScroll className={classnames(styles.HorizontalScroll_iScroll, {
        [styles.__hasScroll]: !! this.state.hasScroll,
        [styles.__scrolling]: !! this.state.isScrolling,
      }, innerClassName)} iScroll={iScroll}
          defer={false}
          options={options}
          ref={(node) => { this.hostNode = node; }}
          onBeforeScrollStart={this._onBeforeScrollStart}
          onScrollCancel={this._onScrollCancelOrEnd}
          onScrollEnd={this._onScrollCancelOrEnd}
          onRefresh={this._onScrollRefresh}>
        {this.props.children}
      </ReactIScroll>
      {
        this.props.hasClickableAreasOnTheSides && [
          <div className={classnames(styles.HorizontalScroll_leftNav, {
            [styles.__visible]: ! this.state.isAtScrollMinX,
          })} onClick={(ev) => {
            ev.preventDefault();
            this.hostNode.withIScroll((_iScroll) => {
              // gte because x pos is negative for some reason
              if (_iScroll.x >= 0) return;
              _iScroll.scrollBy(50, 0, 300, iScroll.utils.ease.circular);
            });
          }} />,
          <div className={classnames(styles.HorizontalScroll_rightNav, {
            [styles.__visible]: ! this.state.isAtScrollMaxX,
          })} onClick={(ev) => {
            ev.preventDefault();
            this.hostNode.withIScroll((_iScroll) => {
              if (_iScroll.x <= _iScroll.maxScrollX) return;
              _iScroll.scrollBy(- 50, 0, 300, iScroll.utils.ease.circular);
            });
          }} />,
        ]
      }
    </div>;
  }
}

HorizontalScroll.propTypes = {
  className: React.PropTypes.string,
  innerClassName: React.PropTypes.string,
  children: React.PropTypes.node,
  options: React.PropTypes.object,
  onScrollReady: React.PropTypes.func,
  hasClickableAreasOnTheSides: React.PropTypes.bool,
};

export default HorizontalScroll;
