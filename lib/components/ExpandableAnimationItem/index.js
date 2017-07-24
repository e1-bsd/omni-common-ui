'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExpandableAnimationItem = function (_PureComponent) {
  _inherits(ExpandableAnimationItem, _PureComponent);

  function ExpandableAnimationItem() {
    _classCallCheck(this, ExpandableAnimationItem);

    return _possibleConstructorReturn(this, (ExpandableAnimationItem.__proto__ || Object.getPrototypeOf(ExpandableAnimationItem)).apply(this, arguments));
  }

  _createClass(ExpandableAnimationItem, [{
    key: '_setUpHeight',
    value: function _setUpHeight(node) {
      this.height = node && node.offsetHeight;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var outerStyle = {
        height: this.props.isExpand ? this.height : 0
      };
      var innerStyle = {
        marginTop: this.props.isExpand ? 0 : -this.height
      };
      return _react2.default.createElement(
        'div',
        { className: _style2.default.ExpandableAnimationItem, style: outerStyle },
        _react2.default.createElement(
          'div',
          { ref: function ref(node) {
              return _this2._setUpHeight(node);
            },
            className: _style2.default.ExpandableAnimationItem_inner,
            style: innerStyle },
          this.props.children
        )
      );
    }
  }]);

  return ExpandableAnimationItem;
}(_react.PureComponent);

ExpandableAnimationItem.propTypes = {
  isExpand: _propTypes2.default.bool,
  height: _propTypes2.default.number,
  children: _propTypes2.default.node
};

exports.default = ExpandableAnimationItem;
//# sourceMappingURL=index.js.map
