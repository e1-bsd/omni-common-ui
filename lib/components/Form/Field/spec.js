'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('applies error style if showError returns true', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Field, { showError: function showError() {
            return true;
        },
        showRequired: function showRequired() {
            return false;
        },
        getErrorMessage: function getErrorMessage() {
            return '';
        } }));
    expect(wrapper.find('.' + _style2.default.__error)).toHaveLength(1);
});

test('does not apply error style if showError returns false', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Field, { showError: function showError() {
            return false;
        },
        showRequired: function showRequired() {
            return false;
        },
        getErrorMessage: function getErrorMessage() {
            return '';
        } }));
    expect(wrapper.find('.' + _style2.default.__error)).toHaveLength(0);
});

test('shows the error message provided by getErrorMessage if showError returns true', function () {
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
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Field, { showError: function showError() {
            return false;
        },
        showRequired: function showRequired() {
            return false;
        },
        getErrorMessage: function getErrorMessage() {
            return '';
        } }));
    var errorClass = _style2.default.Field_wrap_inputContainer_validationError;
    expect(wrapper.find('.' + errorClass)).toHaveLength(0);
});

test('applies required styles if showRequired retuns true', function () {
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

test('does not apply required styles if showRequired retuns false', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, { showError: function showError() {
            return false;
        },
        showRequired: function showRequired() {
            return false;
        },
        getErrorMessage: function getErrorMessage() {
            return '';
        } }));
    expect(wrapper.find('.' + _style2.default.__required)).toHaveLength(0);
});

test('does not use a label if useLabel is not provided', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, { showError: function showError() {
            return false;
        },
        showRequired: function showRequired() {
            return false;
        },
        getErrorMessage: function getErrorMessage() {
            return '';
        } }));
    expect(wrapper.find('label')).toHaveLength(0);
});

test('uses a label if useLabel is provided', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_.Field, { showError: function showError() {
            return false;
        },
        showRequired: function showRequired() {
            return false;
        },
        getErrorMessage: function getErrorMessage() {
            return '';
        },
        useLabel: true }));
    expect(wrapper.find('label')).toHaveLength(1);
});
//# sourceMappingURL=spec.js.map
