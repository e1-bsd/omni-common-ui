'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form', function () {
  describe('Field', function () {
    it('applies error style if showError returns true', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { showError: function showError() {
          return true;
        },
        showRequired: function showRequired() {
          return false;
        },
        getErrorMessage: function getErrorMessage() {
          return '';
        } }));
      (0, _chai.expect)(wrapper.find('.' + _style2.default.__error)).to.have.length(1);
    });

    it('does not apply error style if showError returns false', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { showError: function showError() {
          return false;
        },
        showRequired: function showRequired() {
          return false;
        },
        getErrorMessage: function getErrorMessage() {
          return '';
        } }));
      (0, _chai.expect)(wrapper.find('.' + _style2.default.__error)).to.have.length(0);
    });

    it('shows the error message provided by getErrorMessage if showError returns true', function () {
      var errorMessage = 'This is not a valid email';
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { showError: function showError() {
          return true;
        },
        showRequired: function showRequired() {
          return false;
        },
        getErrorMessage: function getErrorMessage() {
          return errorMessage;
        } }));
      (0, _chai.expect)(wrapper.text()).to.equal(errorMessage);
    });

    it('does not show the error message provided by getErrorMessage ' + 'if showError returns false', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { showError: function showError() {
          return false;
        },
        showRequired: function showRequired() {
          return false;
        },
        getErrorMessage: function getErrorMessage() {
          return '';
        } }));
      var errorClass = _style2.default.Field_wrap_inputContainer_validationError;
      (0, _chai.expect)(wrapper.find('.' + errorClass)).to.have.length(0);
    });

    it('applies required styles if showRequired retuns true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { showError: function showError() {
          return false;
        },
        showRequired: function showRequired() {
          return true;
        },
        getErrorMessage: function getErrorMessage() {
          return '';
        } }));
      (0, _chai.expect)(wrapper.find('.' + _style2.default.__required)).to.have.length(1);
    });

    it('does not apply required styles if showRequired retuns false', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { showError: function showError() {
          return false;
        },
        showRequired: function showRequired() {
          return false;
        },
        getErrorMessage: function getErrorMessage() {
          return '';
        } }));
      (0, _chai.expect)(wrapper.find('.' + _style2.default.__required)).to.have.length(0);
    });

    it('does not use a label if useLabel is not provided', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { showError: function showError() {
          return false;
        },
        showRequired: function showRequired() {
          return false;
        },
        getErrorMessage: function getErrorMessage() {
          return '';
        } }));
      (0, _chai.expect)(wrapper.find('label')).to.have.length(0);
    });

    it('uses a label if useLabel is provided', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { showError: function showError() {
          return false;
        },
        showRequired: function showRequired() {
          return false;
        },
        getErrorMessage: function getErrorMessage() {
          return '';
        },
        useLabel: true }));
      (0, _chai.expect)(wrapper.find('label')).to.have.length(1);
    });
  });
});
//# sourceMappingURL=spec.js.map
