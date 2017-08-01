'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _log = require('./../../domain/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TYPE_REQUEST = /_REQUEST$/i;
var TYPE_SUCCESS = /_SUCCESS$/i;
var TYPE_FAILURE = /_FAILURE$/i;
var TYPE_ANY = /(_REQUEST|_SUCCESS|_FAILURE)$/i;

var InvalidAction = function (_Error) {
  _inherits(InvalidAction, _Error);

  function InvalidAction() {
    _classCallCheck(this, InvalidAction);

    return _possibleConstructorReturn(this, (InvalidAction.__proto__ || Object.getPrototypeOf(InvalidAction)).apply(this, arguments));
  }

  return InvalidAction;
}(Error);

var FINGERPRINT = Symbol('ApiAction');
var TIMESTAMP = Symbol('ApiAction/Timestamp');

var ApiAction = function () {
  function ApiAction() {
    _classCallCheck(this, ApiAction);
  }

  _createClass(ApiAction, null, [{
    key: 'create',
    value: function create(originalAction) {
      var _Object$assign;

      var action = Object.assign({}, originalAction);
      if (_is_js2.default.not.object(action)) {
        throw new InvalidAction('An action should be an object');
      }

      if (_is_js2.default.not.string(action.url)) {
        throw new InvalidAction('The action should have a url property of type string');
      }

      action.url = action.url.toLowerCase();

      if (_is_js2.default.not.string(action.method)) {
        throw new InvalidAction('The action should have a method property of type string');
      }

      if (!/GET|PUT|DELETE|POST/i.test(action.method)) {
        throw new InvalidAction('The action should have a method property of type string');
      }

      action.method = action.method.toUpperCase();

      if (_is_js2.default.not.string(action.type)) {
        throw new InvalidAction('The action should have a type property of type string. ' + ('Got one with a type of ' + _typeof(action.type)));
      }

      if (!TYPE_ANY.test(action.type)) {
        throw new InvalidAction('The type property of an action should end ' + ('with _REQUEST, _SUCCESS or _FAILURE. Got ' + action.type));
      }

      if (/[a-z]/.test(action.type)) {
        throw new InvalidAction('The type property of an action ' + ('should not contain lower case letter. Got ' + action.type));
      }

      if (ApiAction.isFailure(action) && _is_js2.default.not.existy(action.error)) {
        throw new InvalidAction('action.error should be defined for failed calls');
      }

      if (_is_js2.default.existy(action.error) && !(action.error instanceof Error)) {
        action.error = new Error(action.error);
      }

      var newAction = Object.assign(action, (_Object$assign = {}, _defineProperty(_Object$assign, FINGERPRINT, true), _defineProperty(_Object$assign, TIMESTAMP, new Date()), _Object$assign));

      if (ApiAction.isFailure(newAction)) {
        _log2.default.error(newAction.error);
      }

      return Object.freeze(newAction);
    }
  }, {
    key: 'isApiAction',
    value: function isApiAction(object) {
      if (_is_js2.default.not.object(object)) {
        return false;
      }

      return !!object[FINGERPRINT];
    }
  }, {
    key: 'isStarted',
    value: function isStarted(action) {
      return TYPE_REQUEST.test(action.type);
    }
  }, {
    key: 'isSuccess',
    value: function isSuccess(action) {
      return TYPE_SUCCESS.test(action.type);
    }
  }, {
    key: 'isFailure',
    value: function isFailure(action) {
      return TYPE_FAILURE.test(action.type);
    }
  }, {
    key: 'getApiType',
    value: function getApiType(action) {
      return action.type.replace(TYPE_ANY, '');
    }
  }, {
    key: 'getTimestamp',
    value: function getTimestamp(action) {
      return action[TIMESTAMP];
    }
  }]);

  return ApiAction;
}();

exports.default = ApiAction;
//# sourceMappingURL=ApiAction.js.map
