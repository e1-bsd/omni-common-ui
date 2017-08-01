'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotAnInstanceOfApiCallValue = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STATE_LOADING = 'loading';
var STATE_SUCCEEDED = 'succeeded';
var STATE_FAILED = 'failed';

var NotAnInstanceOfApiCallValue = exports.NotAnInstanceOfApiCallValue = function (_Error) {
  _inherits(NotAnInstanceOfApiCallValue, _Error);

  function NotAnInstanceOfApiCallValue() {
    _classCallCheck(this, NotAnInstanceOfApiCallValue);

    return _possibleConstructorReturn(this, (NotAnInstanceOfApiCallValue.__proto__ || Object.getPrototypeOf(NotAnInstanceOfApiCallValue)).apply(this, arguments));
  }

  return NotAnInstanceOfApiCallValue;
}(Error);

var ApiStateRecord = function (_Record) {
  _inherits(ApiStateRecord, _Record);

  function ApiStateRecord() {
    var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ApiStateRecord);

    return _possibleConstructorReturn(this, (ApiStateRecord.__proto__ || Object.getPrototypeOf(ApiStateRecord)).call(this, Object.assign({}, values, { disableDefault: !!values.disableDefault }, { timestamp: new Date() })));
  }

  return ApiStateRecord;
}((0, _immutable.Record)({
  status: undefined,
  error: undefined,
  timestamp: undefined,
  id: undefined,
  disableDefault: undefined
}));

var ApiState = function () {
  function ApiState() {
    _classCallCheck(this, ApiState);
  }

  _createClass(ApiState, null, [{
    key: 'createSucceeded',
    value: function createSucceeded(id) {
      return new ApiStateRecord({ id: id, status: STATE_SUCCEEDED });
    }
  }, {
    key: 'createFailed',
    value: function createFailed(id, error) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          disableDefault = _ref.disableDefault;

      return new ApiStateRecord({
        id: id,
        status: STATE_FAILED,
        error: error,
        disableDefault: disableDefault
      });
    }
  }, {
    key: 'createLoading',
    value: function createLoading(id) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          disableDefault = _ref2.disableDefault;

      return new ApiStateRecord({ id: id, status: STATE_LOADING, disableDefault: disableDefault });
    }
  }, {
    key: 'isValue',
    value: function isValue(value) {
      return value instanceof ApiStateRecord;
    }
  }, {
    key: 'isLoading',
    value: function isLoading(value) {
      if (!ApiState.isValue(value)) {
        throw new NotAnInstanceOfApiCallValue();
      }

      return value.status === STATE_LOADING;
    }
  }, {
    key: 'hasSucceeded',
    value: function hasSucceeded(value) {
      if (!ApiState.isValue(value)) {
        throw new NotAnInstanceOfApiCallValue();
      }

      return value.status === STATE_SUCCEEDED;
    }
  }, {
    key: 'hasFailed',
    value: function hasFailed(value) {
      if (!ApiState.isValue(value)) {
        throw new NotAnInstanceOfApiCallValue();
      }

      return value.status === STATE_FAILED;
    }
  }, {
    key: 'shouldPerform',
    value: function shouldPerform(state) {
      if (!ApiState.isValue(state)) {
        return true;
      }

      return !ApiState.isLoading(state) && !ApiState.hasSucceeded(state) && !ApiState.hasFailed(state);
    }
  }, {
    key: 'getTimestamp',
    value: function getTimestamp(state) {
      state.get('timestamp');
    }
  }]);

  return ApiState;
}();

exports.default = ApiState;
//# sourceMappingURL=ApiState.js.map
