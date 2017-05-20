'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('./../../Card');

var _Card2 = _interopRequireDefault(_Card);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentCard = function (_Component) {
  _inherits(StudentCard, _Component);

  function StudentCard() {
    _classCallCheck(this, StudentCard);

    return _possibleConstructorReturn(this, (StudentCard.__proto__ || Object.getPrototypeOf(StudentCard)).apply(this, arguments));
  }

  _createClass(StudentCard, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          _props$backgroundless = _props.backgroundless,
          backgroundless = _props$backgroundless === undefined ? false : _props$backgroundless,
          _props$withSeparatorL = _props.withSeparatorLine,
          withSeparatorLine = _props$withSeparatorL === undefined ? false : _props$withSeparatorL,
          _props$vertical = _props.vertical,
          vertical = _props$vertical === undefined ? false : _props$vertical;

      return {
        backgroundless: backgroundless,
        withSeparatorLine: withSeparatorLine,
        vertical: vertical
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          borderless = _props2.borderless,
          statusAccentColor = _props2.statusAccentColor,
          statusAccentPosition = _props2.statusAccentPosition;

      var classes = (0, _classnames4.default)(_style2.default.StudentCard, this.props.className, _defineProperty({}, _style2.default['__' + statusAccentPosition], !!statusAccentPosition), _defineProperty({}, _style2.default['__' + statusAccentColor], !!statusAccentColor));

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          _Card2.default,
          { borderless: !!borderless, className: _style2.default.StudentCard_Card },
          this.props.children
        )
      );
    }
  }]);

  return StudentCard;
}(_react.Component);

StudentCard.accentPosition = ['bottom', 'left'];

StudentCard.accentColors = ['grey', 'green', 'amber', 'red', 'invalid'];

StudentCard.childContextTypes = {
  backgroundless: _react2.default.PropTypes.bool,
  withSeparatorLine: _react2.default.PropTypes.bool,
  vertical: _react2.default.PropTypes.bool
};

StudentCard.propTypes = {
  backgroundless: _react2.default.PropTypes.bool,
  borderless: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  withSeparatorLine: _react2.default.PropTypes.bool,
  statusAccentPosition: _react2.default.PropTypes.oneOf(StudentCard.accentPosition),
  statusAccentColor: _react2.default.PropTypes.oneOf(StudentCard.accentColors),
  children: _react2.default.PropTypes.node,
  vertical: _react2.default.PropTypes.bool
};

exports.default = StudentCard;
//# sourceMappingURL=index.js.map
