'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requiredIcons = require.context('.', false, /\.svg$/);
exports.default = requiredIcons.keys().reduce(function (map, key) {
  return map.set(key.match(new RegExp('.\\' + _path2.default.sep + '(.+)\\.svg$'))[1], requiredIcons(key));
}, new _immutable.Map());
//# sourceMappingURL=icons.js.map
