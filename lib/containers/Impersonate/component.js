'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _actions = require('./actions');

var _TextInput = require('./../../components/TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Button = require('./../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _testClass = require('./../../domain/testClass');

var _testClass2 = _interopRequireDefault(_testClass);

var _AlertDialog = require('./../../components/AlertDialog');

var _AlertDialog2 = _interopRequireDefault(_AlertDialog);

var _ApiCalls = require('./../ApiCalls');

var _ApiCalls2 = _interopRequireDefault(_ApiCalls);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var suffix = '@ef.com';

var Impersonate = function (_PureComponent) {
  _inherits(Impersonate, _PureComponent);

  function Impersonate(props) {
    _classCallCheck(this, Impersonate);

    var _this = _possibleConstructorReturn(this, (Impersonate.__proto__ || Object.getPrototypeOf(Impersonate)).call(this, props));

    _this.state = {
      impersonateEmail: '',
      emailChanged: false
    };

    _this._handleSwitchClick.bind(_this);
    _this._handleEmailChange.bind(_this);
    return _this;
  }

  _createClass(Impersonate, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.clearImpersonateData();
    }
  }, {
    key: '_handleSwitchClick',
    value: function _handleSwitchClick() {
      this.props.postedImpersonate(this.state.impersonateEmail + suffix, this.props.token);
      this.setState({ emailChanged: false });
    }
  }, {
    key: '_handleEmailChange',
    value: function _handleEmailChange(e) {
      this.setState({ impersonateEmail: e.target.value, emailChanged: true });
    }
  }, {
    key: '_renderErrorPopup',
    value: function _renderErrorPopup() {
      var error = this.props.error;
      if (!error) return;
      var _props = this.props,
          clean = _props.clean,
          apiKey = _props.apiKey;

      var cleanError = function cleanError() {
        return clean(apiKey);
      };

      return _react2.default.createElement(_AlertDialog2.default, { isWarning: true,
        content1: error.response.error,
        okButtonContent: 'OK',
        onButtonClick: cleanError });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var postImpersonateState = this.props.postImpersonateState;

      var errorCode = postImpersonateState ? postImpersonateState.get('error') : undefined;
      var data = postImpersonateState ? postImpersonateState.get('data') : undefined;

      if (data) {
        this.props.success();
      }

      var inputClasses = (0, _classnames3.default)(_defineProperty({}, _style2.default.error, !this.state.emailChanged && errorCode), (0, _testClass2.default)('impersonate-dialog-input'));

      return _react2.default.createElement(
        'div',
        { className: _style2.default.Impersonate },
        _react2.default.createElement(
          'p',
          { className: _style2.default.Impersonate_title },
          'Switch User'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_TextInput2.default, { labelName: 'Email',
            className: _style2.default.Impersonate_field,
            inputClassName: inputClasses,
            suffix: suffix,
            onChange: function onChange(e) {
              return _this2._handleEmailChange(e);
            } })
        ),
        _react2.default.createElement(
          _Button2.default.Container,
          { className: _style2.default.Impersonate_buttonContainer,
            align: 'center' },
          _react2.default.createElement(
            _Button2.default,
            { type: _Button2.default.Type.primary,
              className: (0, _classnames3.default)(_style2.default.button, (0, _testClass2.default)('impersonate-dialog-switch')),
              disabled: !this.state.impersonateEmail,
              onClick: function onClick() {
                return _this2._handleSwitchClick();
              } },
            'SWITCH'
          ),
          _react2.default.createElement(
            _Button2.default,
            { className: _style2.default.button,
              onClick: function onClick() {
                return _this2.props.close();
              } },
            'CANCEL'
          )
        ),
        this._renderErrorPopup()
      );
    }
  }]);

  return Impersonate;
}(_react.PureComponent);

Impersonate.propTypes = {
  postImpersonateState: _propTypes2.default.object,
  close: _propTypes2.default.func,
  success: _propTypes2.default.func,
  postedImpersonate: _propTypes2.default.func,
  clearImpersonateData: _propTypes2.default.func,
  token: _propTypes2.default.string,
  apiKey: _propTypes2.default.string,
  error: _propTypes2.default.object,
  clean: _propTypes2.default.func.isRequired
};

function mapStateToProps(state) {
  var apiKey = 'POST ' + (0, _actions.getTokenEndPoint)();
  var error = state.get('apiCalls').get(apiKey) && state.get('apiCalls').get(apiKey).error;
  return {
    postImpersonateState: state.get('impersonate').get('postedImpersonate').get('impersonate'),
    token: state.get('singleSignOn').get('user').get('id_token'),
    error: error,
    apiKey: apiKey
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postedImpersonate: function postedImpersonate(email, token) {
      return dispatch((0, _actions.postImpersonate)(email, token));
    },
    clearImpersonateData: function clearImpersonateData() {
      return dispatch((0, _actions.clearImpersonateData)());
    },
    clean: function clean(key) {
      return dispatch(_ApiCalls2.default.clean(key));
    }
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Impersonate);
//# sourceMappingURL=component.js.map
