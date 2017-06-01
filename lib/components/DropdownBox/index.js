'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownBoxItem = require('./DropdownBoxItem');

var _DropdownBoxItem2 = _interopRequireDefault(_DropdownBoxItem);

var _DropdownBoxContainer = require('./DropdownBoxContainer');

var _DropdownBoxContainer2 = _interopRequireDefault(_DropdownBoxContainer);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlignmentClasses = [_style2.default.__alignRightFromBottom, _style2.default.__alignLeftFromBottom, _style2.default.__alignLeftFromTop, _style2.default.__alignBottomFromLeft, // default
_style2.default.__alignRightFromBottom];

var isElementVisible = function isElementVisible(el) {
  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  var rect = el.getBoundingClientRect();

  // is it in the viewport?
  if (rect.right < 0 || rect.bottom < 0 || rect.left > viewportWidth || rect.top > viewportHeight) {
    return false;
  }

  // we can just check visibility of three points here (left, centre, right)
  // if we just check the centre the right side might be clipped off. other scenarios seem OK.
  return (
    // centre
    el.contains(document.elementFromPoint(rect.right - rect.width / 2, rect.bottom - rect.height / 2)) &&
    // left
    el.contains(document.elementFromPoint(rect.left + 1, rect.bottom - rect.height / 2)) &&
    // right
    el.contains(document.elementFromPoint(rect.right - 1, rect.bottom - rect.height / 2))
  );
};

var isDropdownOptionsFullyVisible = function isDropdownOptionsFullyVisible(el) {
  if (!el.children || el.children.length < 2) {
    return isElementVisible(el);
  }
  // check the visibility of first and last dropdown items
  var firstChildEl = el.children[0];
  var lastChildEl = el.children[el.children.length - 1];
  return isElementVisible(firstChildEl) && isElementVisible(lastChildEl);
};

var DropdownBox = function (_PureComponent) {
  _inherits(DropdownBox, _PureComponent);

  function DropdownBox(props) {
    _classCallCheck(this, DropdownBox);

    var _this = _possibleConstructorReturn(this, (DropdownBox.__proto__ || Object.getPrototypeOf(DropdownBox)).call(this, props));

    _this._onRef = _this._onRef.bind(_this);
    return _this;
  }

  _createClass(DropdownBox, [{
    key: '_onRef',
    value: function _onRef(el) {
      if (!el || getComputedStyle(el).position !== 'absolute') return;
      // run through alignments until we get one that looks good
      var alignmentClassesToTry = AlignmentClasses.concat(); // clone
      var alignmentClassToTry = void 0;
      var lastAlignmentClassTried = void 0;
      while (alignmentClassesToTry.length && !isDropdownOptionsFullyVisible(el)) {
        alignmentClassToTry = alignmentClassesToTry.shift();
        el.classList.add(alignmentClassToTry);
        if (lastAlignmentClassTried) el.classList.remove(lastAlignmentClassTried);
        lastAlignmentClassTried = alignmentClassToTry;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          children = _props.children,
          open = _props.open,
          smartPosition = _props.smartPosition;

      return _react2.default.createElement(
        _CSSTransitionGroup2.default,
        { transitionName: 'dropdown' },
        open === true && _react2.default.createElement(
          'div',
          { className: _style2.default.DropdownBox_transitionWrapper },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(_style2.default.DropdownBox, className),
              ref: smartPosition && this._onRef },
            _react2.default.Children.toArray(children).filter(function (child) {
              return child.type === _DropdownBoxItem2.default;
            })
          )
        )
      );
    }
  }]);

  return DropdownBox;
}(_react.PureComponent);

DropdownBox.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  open: _propTypes2.default.bool,
  smartPosition: _propTypes2.default.bool
};

DropdownBox.Item = _DropdownBoxItem2.default;
DropdownBox.Container = _DropdownBoxContainer2.default;

exports.default = DropdownBox;
//# sourceMappingURL=index.js.map
