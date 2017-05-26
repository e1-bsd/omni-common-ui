'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _ErrorPage = require('./../ErrorPage');

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthorisationErrorPage = function AuthorisationErrorPage(props) {
  var parsedProps = Object.assign({}, props);
  parsedProps.config = Object.assign({
    icon: function icon() {
      return 'lock';
    },
    message: function message() {
      return 'You have no permission to access this page.';
    }
  }, props.config);

  return _react2.default.createElement(_ErrorPage2.default, parsedProps);
};

AuthorisationErrorPage.propTypes = {
  config: _propTypes2.default.object
};

exports.default = (0, _pure2.default)(AuthorisationErrorPage);
//# sourceMappingURL=index.js.map
