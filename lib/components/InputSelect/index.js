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

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputSelect = function (_Component) {
  _inherits(InputSelect, _Component);

  function InputSelect(props) {
    _classCallCheck(this, InputSelect);

    var _this = _possibleConstructorReturn(this, (InputSelect.__proto__ || Object.getPrototypeOf(InputSelect)).call(this, props));

    var initOption = _is_js2.default.not.undefined(props.optionList[props.value]) ? props.optionList[props.value] : props.defaultOption;
    _this.state = {
      value: props.value,
      selectedOption: initOption,
      selectedText: _is_js2.default.not.undefined(initOption) ? initOption.name : ''
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.updateState = _this.updateState.bind(_this);
    return _this;
  }

  _createClass(InputSelect, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.updateState(props.value);
    }
  }, {
    key: 'updateState',
    value: function updateState(value) {
      var props = this.props;
      var option = void 0;
      if (_is_js2.default.array(props.optionList)) {
        option = _lodash2.default.find(props.optionList, ['id', value]);
      } else {
        option = _is_js2.default.not.undefined(props.optionList[value]) ? props.optionList[value] : props.defaultOption;
      }

      this.setState({
        value: value,
        selectedOption: option,
        selectedText: _is_js2.default.not.undefined(option) ? option.name : ''
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.updateState(e.target.value);
      this.props.onChange(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          optionKeys = _props.optionKeys,
          optionList = _props.optionList,
          className = _props.className,
          selectClassName = _props.selectClassName,
          labelClassName = _props.labelClassName,
          defaultOption = _props.defaultOption,
          disabledDefaultOption = _props.disabledDefaultOption,
          nameIdentified = _props.nameIdentified;

      var classes = (0, _classnames2.default)(_style2.default.InputSelect, className);
      var selectClasses = (0, _classnames2.default)(selectClassName, _style2.default.InputSelect_select);
      var labelClasses = (0, _classnames2.default)(labelClassName, _style2.default.InputSelect_name);

      function renderOptions() {
        if (optionKeys && _is_js2.default.object(optionList)) {
          return optionKeys.map(function (key) {
            return _react2.default.createElement(
              'option',
              { value: key },
              optionList[key] ? optionList[key].name : ''
            );
          });
        }

        if (!optionKeys && _is_js2.default.array(optionList)) {
          if (!nameIdentified) {
            return optionList.map(function (item) {
              return _react2.default.createElement(
                'option',
                { value: item.id },
                item.name
              );
            });
          }
          return optionList.map(function (item) {
            return _react2.default.createElement(
              'option',
              { value: item.name },
              item.name
            );
          });
        }
      }
      return _react2.default.createElement(
        'div',
        { className: classes, style: this.props.myStyle },
        this.props.labelName ? _react2.default.createElement(
          'span',
          { className: labelClasses },
          this.props.labelName
        ) : '',
        _react2.default.createElement(
          'select',
          { className: selectClasses,
            disabled: this.props.disabled,
            style: this.props.selectStyle,
            onChange: this.handleChange,
            value: this.props.value,
            required: this.props.required },
          _react2.default.createElement(
            'option',
            { value: _is_js2.default.object(defaultOption) ? defaultOption.key : '',
              disabled: disabledDefaultOption,
              style: { display: disabledDefaultOption ? 'none' : 'block' } },
            _is_js2.default.object(defaultOption) ? defaultOption.name : defaultOption
          ),
          renderOptions()
        )
      );
    }
  }]);

  return InputSelect;
}(_react.Component);

exports.default = InputSelect;


InputSelect.propTypes = {
  optionList: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.array]),
  optionKeys: _react2.default.PropTypes.array.isRequired,
  myStyle: _react2.default.PropTypes.object,
  selectStyle: _react2.default.PropTypes.object,
  className: _react2.default.PropTypes.string,
  selectClassName: _react2.default.PropTypes.string,
  labelClassName: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  labelName: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  required: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func,
  defaultOption: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.shape({
    key: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    name: _react2.default.PropTypes.string
  })]),
  disabledDefaultOption: _react2.default.PropTypes.bool,
  nameIdentified: _react2.default.PropTypes.bool
};

InputSelect.defaultProps = {
  nameIdentified: false,
  disabledDefaultOption: false,
  optionList: {}
};
//# sourceMappingURL=index.js.map
