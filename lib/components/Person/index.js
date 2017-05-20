'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StudentPicture = require('./../StudentPicture');

var _StudentPicture2 = _interopRequireDefault(_StudentPicture);

var _AdultPicture = require('./../AdultPicture');

var _AdultPicture2 = _interopRequireDefault(_AdultPicture);

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isPicture = function isPicture(c) {
  return c.type === _StudentPicture2.default || c.type === _AdultPicture2.default;
};

var Person = function (_Component) {
  _inherits(Person, _Component);

  function Person(props) {
    _classCallCheck(this, Person);

    var _this = _possibleConstructorReturn(this, (Person.__proto__ || Object.getPrototypeOf(Person)).call(this, props));

    _this._setUp(props);
    return _this;
  }

  _createClass(Person, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props) {
      this._setUp(props);
    }
  }, {
    key: '_setUp',
    value: function _setUp(props) {
      if (!PRODUCTION) {
        this._showWarnings(props);
      }

      var children = _react2.default.Children.toArray(props.children);
      this._lines = children.filter(function (c) {
        return !isPicture(c);
      });

      var picture = children.find(isPicture);
      this._picture = _react2.default.createElement(picture.type, _extends({}, picture.props, {
        className: (0, _classnames3.default)(picture.props.className, _style2.default.Person_picture, _defineProperty({}, _style2.default.Person_picture_vertical, props.vertical)) }));
    }
  }, {
    key: '_showWarnings',
    value: function _showWarnings(props) {
      var children = _react2.default.Children.toArray(props.children);
      var pictures = children.filter(isPicture);
      var lines = children.filter(function (c) {
        return !isPicture(c);
      });

      if (pictures <= 0) {
        _log2.default.warn('No picture provided to Person');
      }

      if (pictures > 1) {
        _log2.default.warn('More than one picture provided to Person');
      }

      if (lines <= 0) {
        _log2.default.warn('No lines provided to Person');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var personLinesClassName = this.props.vertical ? (0, _classnames3.default)(_style2.default.Person_lines, _style2.default.Person_lines_vertical) : _style2.default.Person_lines;
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames3.default)(_style2.default.Person, this.props.className) },
        this._picture,
        _react2.default.createElement(
          'div',
          { className: personLinesClassName },
          this._lines
        )
      );
    }
  }]);

  return Person;
}(_react.Component);

Person.propTypes = {
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  vertical: _react2.default.PropTypes.bool
};

exports.default = Person;
//# sourceMappingURL=index.js.map
