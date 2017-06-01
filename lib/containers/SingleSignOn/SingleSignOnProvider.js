'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxOidc = require('redux-oidc');

var _userManager = require('./userManager');

var _userManager2 = _interopRequireDefault(_userManager);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleSignOnProvider = function SingleSignOnProvider(props) {
  return _react2.default.createElement(
    _reduxOidc.OidcProvider,
    { store: props.store, userManager: _userManager2.default },
    props.children
  );
};

SingleSignOnProvider.propTypes = {
  children: _propTypes2.default.node,
  store: _propTypes2.default.object
};

exports.default = SingleSignOnProvider;
//# sourceMappingURL=SingleSignOnProvider.js.map
