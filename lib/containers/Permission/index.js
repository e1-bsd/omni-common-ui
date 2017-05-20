'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connect = require('./../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _PrivilegeChecker = require('./../../domain/PrivilegeChecker');

var _PrivilegeChecker2 = _interopRequireDefault(_PrivilegeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Permission = function Permission(props) {
  if (!_PrivilegeChecker2.default.hasPrivilege(props.state, props.permissionId)) {
    return null;
  }

  return props.children;
};

function mapStateToProps(state) {
  return { state: state };
}

Permission.propTypes = {
  permissionId: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node
};

exports.default = (0, _connect2.default)(mapStateToProps)(Permission);
//# sourceMappingURL=index.js.map
