'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownBoxContainer = function (_PureComponent) {
  _inherits(DropdownBoxContainer, _PureComponent);

  function DropdownBoxContainer(props) {
    _classCallCheck(this, DropdownBoxContainer);

    var _this = _possibleConstructorReturn(this, (DropdownBoxContainer.__proto__ || Object.getPrototypeOf(DropdownBoxContainer)).call(this, props));

    _this._onClickedOutside = _this._onClickedOutside.bind(_this);
    _this._onRef = _this._onRef.bind(_this);
    return _this;
  }

  _createClass(DropdownBoxContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (_is_js2.default.function(this.props.onClickOutside)) {
        document.body.addEventListener('click', this._onClickedOutside);
        document.body.addEventListener('touchstart', this._onClickedOutside);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this._onClickedOutside);
      document.body.removeEventListener('touchstart', this._onClickedOutside);
    }
  }, {
    key: '_onClickedOutside',
    value: function _onClickedOutside(evt) {
      if (this._node.contains(evt.target)) {
        return;
      }

      this.props.onClickOutside();
    }
  }, {
    key: '_onRef',
    value: function _onRef(ref) {
      this._node = ref;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          children = _props.children;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className),
          ref: this._onRef },
        children
      );
    }
  }]);

  return DropdownBoxContainer;
}(_react.PureComponent);

DropdownBoxContainer.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  onClickOutside: _propTypes2.default.func
};

exports.default = DropdownBoxContainer;
//# sourceMappingURL=index.js.map
