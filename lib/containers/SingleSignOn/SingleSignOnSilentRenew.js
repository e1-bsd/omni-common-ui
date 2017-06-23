'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reduxOidc = require('redux-oidc');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleSignOnSilentRenew = function (_PureComponent) {
  _inherits(SingleSignOnSilentRenew, _PureComponent);

  function SingleSignOnSilentRenew() {
    _classCallCheck(this, SingleSignOnSilentRenew);

    return _possibleConstructorReturn(this, (SingleSignOnSilentRenew.__proto__ || Object.getPrototypeOf(SingleSignOnSilentRenew)).apply(this, arguments));
  }

  _createClass(SingleSignOnSilentRenew, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _reduxOidc.processSilentRenew)();
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return SingleSignOnSilentRenew;
}(_react.PureComponent);

exports.default = SingleSignOnSilentRenew;
//# sourceMappingURL=SingleSignOnSilentRenew.js.map