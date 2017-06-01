'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connect = require('./../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _PrivilegeChecker = require('./../../domain/PrivilegeChecker');

var _PrivilegeChecker2 = _interopRequireDefault(_PrivilegeChecker);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
  permissionId: _propTypes2.default.string,
  children: _propTypes2.default.node
};

exports.default = (0, _connect2.default)(mapStateToProps)(Permission);
//# sourceMappingURL=index.js.map
