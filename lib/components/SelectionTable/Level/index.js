'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('./../../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Level = function (_PureComponent) {
  _inherits(Level, _PureComponent);

  function Level() {
    _classCallCheck(this, Level);

    return _possibleConstructorReturn(this, (Level.__proto__ || Object.getPrototypeOf(Level)).apply(this, arguments));
  }

  _createClass(Level, [{
    key: '_onLevelClick',
    value: function _onLevelClick() {
      var _props = this.props,
          onClick = _props.onClick,
          route = _props.route,
          label = _props.label;

      var newRoute = Array.from([].concat(_toConsumableArray(route), [label]));
      onClick(newRoute);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var label = this.props.label;

      return _react2.default.createElement(
        'div',
        { className: _style2.default.Level, onClick: function onClick() {
            return _this2._onLevelClick();
          } },
        _react2.default.createElement(
          'span',
          { className: _style2.default.Level_label },
          label
        ),
        _react2.default.createElement(
          'span',
          { className: _style2.default.Level_icon },
          _react2.default.createElement(_Icon2.default, { id: 'chevron-thin-right' })
        )
      );
    }
  }]);

  return Level;
}(_react.PureComponent);

Level.propTypes = {
  children: _propTypes2.default.node,
  label: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func,
  route: _propTypes2.default.array,
  currentRoute: _propTypes2.default.array
};

exports.default = Level;
//# sourceMappingURL=index.js.map
