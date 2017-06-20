'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requiredPropNoops = {
  showError: function showError() {
    return false;
  },
  showRequired: function showRequired() {
    return false;
  },
  getErrorMessage: function getErrorMessage() {
    return '';
  }
};

describe('applies className and labelTextClassName', function () {
  test('applies className to itself', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, _extends({}, requiredPropNoops, { className: 'fieldextra' })));
    expect(wrapper.find('.' + _style2.default.Field + '.fieldextra')).toHaveLength(1);
  });

  test('applies labelTextClassName to label span', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, _extends({}, requiredPropNoops, { labelTextClassName: 'labelextra' })));
    expect(wrapper.find('.' + _style2.default.Field_wrap_label + '.labelextra')).toHaveLength(1);
  });
});

describe('applies the error state style', function () {
  test('applies error style if showError returns true', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Field, _extends({}, requiredPropNoops, { showError: function showError() {
        return true;
      } })));
    expect(wrapper.find('.' + _style2.default.__error)).toHaveLength(1);
  });

  test('does not apply error style if showError returns false', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Field, requiredPropNoops));
    expect(wrapper.find('.' + _style2.default.__error)).toHaveLength(0);
  });

  test('shows the error message provided by getErrorMessage ' + 'if showError returns true', function () {
    var errorMessage = 'This is not a valid email';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Field, { showError: function showError() {
        return true;
      },
      showRequired: function showRequired() {
        return false;
      },
      getErrorMessage: function getErrorMessage() {
        return errorMessage;
      } }));
    expect(wrapper.text()).toBe(errorMessage);
  });

  test('does not show the error message provided by getErrorMessage ' + 'if showError returns false', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Field, requiredPropNoops));
    var errorClass = _style2.default.Field_wrap_inputContainer_validationError;
    expect(wrapper.find('.' + errorClass)).toHaveLength(0);
  });
});

describe('applies the required field style', function () {
  test('applies required styles if showRequired returns true', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, { showError: function showError() {
        return false;
      },
      showRequired: function showRequired() {
        return true;
      },
      getErrorMessage: function getErrorMessage() {
        return '';
      } }));
    expect(wrapper.find('.' + _style2.default.__required)).toHaveLength(1);
  });

  test('does not apply required styles if showRequired returns false', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, requiredPropNoops));
    expect(wrapper.find('.' + _style2.default.__required)).toHaveLength(0);
  });
});

describe('allows for an optional label to be provided', function () {
  test('does not use a label if useLabel is not provided', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, requiredPropNoops));
    expect(wrapper.find('label')).toHaveLength(0);
  });

  test('uses a label if useLabel is provided', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, _extends({}, requiredPropNoops, { useLabel: true })));
    expect(wrapper.find('label')).toHaveLength(1);
  });
});

describe('allows field stack mode to be changed', function () {
  test('does not apply Field.__stackedHorizontally by default', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, requiredPropNoops));
    expect(wrapper.find('.' + _style2.default.Field + '.' + _style2.default.__stackedHorizontally)).toHaveLength(0);
  });

  test('does not apply Field_wrap.__stackedVertically by default', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, requiredPropNoops));
    expect(wrapper.find('.' + _style2.default.Field_wrap + '.' + _style2.default.__stackedVertically)).toHaveLength(0);
  });

  test('applies Field.__stackedHorizontally when enabled', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, _extends({}, requiredPropNoops, { neighborStackMode: 'horizontal' })));
    expect(wrapper.find('.' + _style2.default.Field + '.' + _style2.default.__stackedHorizontally)).toHaveLength(1);
  });

  test('applies Field_wrap.__stackedVertically when enabled', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, _extends({}, requiredPropNoops, { innerStackMode: 'vertical' })));
    expect(wrapper.find('.' + _style2.default.Field_wrap + '.' + _style2.default.__stackedVertically)).toHaveLength(1);
  });
});
//# sourceMappingURL=spec.js.map
