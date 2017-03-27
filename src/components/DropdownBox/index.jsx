import styles from './style.postcss';

import React, { PureComponent } from 'react';
import classnames from 'classnames';
import DropdownBoxItem from './DropdownBoxItem';
import DropdownBoxContainer from './DropdownBoxContainer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const AlignmentClasses = [
  styles.__alignRightFromBottom,
  styles.__alignLeftFromBottom,
  styles.__alignLeftFromTop,
  styles.__alignBottomFromLeft,  // default
  styles.__alignRightFromBottom, // fallback when space is limited in single student group
];

const isElementVisible = (el) => {
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const rect = el.getBoundingClientRect();

  // is it in the viewport?
  if (rect.right < 0 || rect.bottom < 0 ||
        rect.left > viewportWidth || rect.top > viewportHeight) {
    return false;
  }

  // we can just check visibility of three points here (left, centre, right)
  // if we just check the centre the right side might be clipped off. other scenarios seem OK.
  return (
    // centre
    el.contains(
      document.elementFromPoint(
        rect.right - (rect.width / 2),
        rect.bottom - (rect.height / 2)))) &&
    // left
    el.contains(
      document.elementFromPoint(
        rect.left + 1,
        rect.bottom - (rect.height / 2))) &&
    // right
    el.contains(
      document.elementFromPoint(
        rect.right - 1,
        rect.bottom - (rect.height / 2)));
};

const isDropdownOptionsFullyVisible = (el) => {
  if (! el.children || el.children.length < 2) {
    return isElementVisible(el);
  }
  // check the visibility of first and last dropdown items
  const firstChildEl = el.children[0];
  const lastChildEl = el.children[el.children.length - 1];
  return isElementVisible(firstChildEl) && isElementVisible(lastChildEl);
};

class DropdownBox extends PureComponent {
  constructor(props) {
    super(props);
    this._onRef = this._onRef.bind(this);
  }

  _onRef(el) {
    if (! el || getComputedStyle(el).position !== 'absolute') return;
    // run through alignments until we get one that looks good
    const alignmentClassesToTry = AlignmentClasses.concat();  // clone
    let alignmentClassToTry;
    let lastAlignmentClassTried;
    while (alignmentClassesToTry.length && ! isDropdownOptionsFullyVisible(el)) {
      alignmentClassToTry = alignmentClassesToTry.shift();
      el.classList.add(alignmentClassToTry);
      if (lastAlignmentClassTried) el.classList.remove(lastAlignmentClassTried);
      lastAlignmentClassTried = alignmentClassToTry;
    }
  }

  render() {
    const { className, children, open, smartPosition } = this.props;
    return <ReactCSSTransitionGroup transitionName="dropdown">
      {
        open === true &&
        <div className={classnames(styles.DropdownBox, className)}
            ref={smartPosition && this._onRef}>
          {React.Children.toArray(children).filter((child) => child.type === DropdownBoxItem)}
        </div>
      }
    </ReactCSSTransitionGroup>;
  }
}

DropdownBox.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  open: React.PropTypes.bool,
  smartPosition: React.PropTypes.bool,
};

DropdownBox.Item = DropdownBoxItem;
DropdownBox.Container = DropdownBoxContainer;

export default DropdownBox;
