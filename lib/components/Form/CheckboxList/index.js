'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('react-select/dist/react-select.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxList = function (_PureComponent) {
  _inherits(CheckboxList, _PureComponent);

  function CheckboxList() {
    _classCallCheck(this, CheckboxList);

    return _possibleConstructorReturn(this, (CheckboxList.__proto__ || Object.getPrototypeOf(CheckboxList)).apply(this, arguments));
  }

  _createClass(CheckboxList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.setValue([]);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e, option) {
      var checked = e.currentTarget.checked;

      var newValue = [];
      if (checked) {
        newValue = this.props.getValue().concat(option);
      } else {
        newValue = this.props.getValue().filter(function (it) {
          return !CheckboxList.cmp(it, option);
        });
      }

      this.props.setValue(newValue);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          name = _props.name,
          label = _props.label,
          items = _props.items,
          validations = _props.validations,
          validationError = _props.validationError;

      var checked = this.props.getValue() || [];

      return _react2.default.createElement(
        _Field2.default,
        { label: label,
          getErrorMessage: function getErrorMessage() {
            return _this2.props.getErrorMessage();
          },
          showError: function showError() {
            return _this2.props.showError();
          },
          validations: validations,
          validationError: validationError,
          showRequired: function showRequired() {
            return _this2.props.showRequired();
          } },
        items.map(function (item) {
          return _react2.default.createElement(_Checkbox2.default, { key: name,
            name: name,
            item: item,
            onChecked: function onChecked(e) {
              return _this2.handleChange(e, item);
            },
            checked: checked.indexOf(item) >= 0 });
        })
      );
    }
  }], [{
    key: 'cmp',
    value: function cmp(a, b) {
      return a === b;
    }
  }]);

  return CheckboxList;
}(_react.PureComponent);

CheckboxList.propTypes = {
  setValue: _propTypes2.default.func.isRequired,
  getValue: _propTypes2.default.func.isRequired,
  name: _propTypes2.default.string,
  label: _propTypes2.default.string,
  items: _propTypes2.default.array,
  getErrorMessage: _propTypes2.default.func.isRequired,
  showRequired: _propTypes2.default.func.isRequired,
  showError: _propTypes2.default.func.isRequired,
  validations: _propTypes2.default.string,
  validationError: _propTypes2.default.string
};

exports.default = (0, _formsyReact.HOC)(CheckboxList);
//# sourceMappingURL=index.js.map
