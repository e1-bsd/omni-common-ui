'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.ApiError = exports.buildUrl = undefined;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _Store = require('./../Store');

var _Store2 = _interopRequireDefault(_Store);

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

var _Config = require('./../Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buildUrl = exports.buildUrl = function buildUrl(path) {
  return _Config2.default.get('apiBase') + path;
};

var FetchTimedOutError = function (_Error) {
  _inherits(FetchTimedOutError, _Error);

  function FetchTimedOutError() {
    _classCallCheck(this, FetchTimedOutError);

    return _possibleConstructorReturn(this, (FetchTimedOutError.__proto__ || Object.getPrototypeOf(FetchTimedOutError)).apply(this, arguments));
  }

  return FetchTimedOutError;
}(Error);

var ApiError = exports.ApiError = function (_Error2) {
  _inherits(ApiError, _Error2);

  function ApiError() {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var message = arguments[1];

    _classCallCheck(this, ApiError);

    // https://fetch.spec.whatwg.org/#responses
    var _this2 = _possibleConstructorReturn(this, (ApiError.__proto__ || Object.getPrototypeOf(ApiError)).call(this, message || response.statusText));

    _this2.ok = response.ok;
    _this2.url = response.url;
    _this2.type = response.type;
    _this2.status = response.status;
    _this2.statusText = response.statusText;
    _this2.headers = response.headers;
    _this2.body = response.body;
    return _this2;
  }

  return ApiError;
}(Error);

var fetch = exports.fetch = function fetch(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var finalOptions = Object.assign({}, options, getTokenHeader(options));
  return new Promise(function (resolve, reject) {
    var onTimeout = function onTimeout() {
      return reject(new FetchTimedOutError('Call to ' + url + ' has taken too long!'));
    };
    var timeout = setTimeout(onTimeout, _Config2.default.get('fetchTimeout'));

    (0, _isomorphicFetch2.default)(url, finalOptions).then(checkResponseStatus).then(parseResponse).then(function (response) {
      clearTimeout(timeout);
      resolve(response);
    }).catch(function (error) {
      clearTimeout(timeout);
      reject(error);
    });
  });
};

function parseResponse(rawResponse) {
  return rawResponse.text().then(function (response) {
    try {
      return JSON.parse(response);
    } catch (e) {
      return response;
    }
  });
}

function checkResponseStatus(response) {
  if (response.ok) {
    return response;
  }

  var error = new ApiError(response);
  try {
    return parseResponse(response).then(function (apiResponse) {
      if (_is_js2.default.not.object(apiResponse)) {
        error.response = apiResponse;
      } else {
        error.response = {};
        Object.keys(apiResponse).forEach(function (key) {
          error.response[(0, _camelcase2.default)(key)] = apiResponse[key];
        });
      }

      throw error;
    });
  } catch (e) {
    throw error;
  }
}

function getTokenHeader(options) {
  var user = _Store2.default.get().getState().get('singleSignOn').user || {};
  var token = user.access_token;
  return {
    headers: Object.assign({
      Accept: 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + token
    }, _is_js2.default.not.object(options) ? undefined : options.headers)
  };
}

var Api = function Api() {
  _classCallCheck(this, Api);
};

Api.fetch = fetch;
Api.buildUrl = buildUrl;

exports.default = Api;
//# sourceMappingURL=index.js.map
