'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorPageHandler = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ErrorPage = require('./../../components/ErrorPage');

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _connect = require('./../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorPageHandler = exports.ErrorPageHandler = function ErrorPageHandler(props) {
  return _react2.default.createElement(_ErrorPage2.default, props);
};

ErrorPageHandler.propTypes = {};

exports.default = (0, _connect2.default)()(ErrorPageHandler);
//# sourceMappingURL=index.js.map
