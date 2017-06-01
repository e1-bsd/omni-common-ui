'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePlaceholderSvgDataUri = exports.generatePlaceholderSvgXml = undefined;

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COLOR_SPECS = [{
  nameRegexp: /^[A-D]/i,
  bgFill: '#59295A',
  textFill: 'white'
}, {
  nameRegexp: /^[E-H]/i,
  bgFill: '#92205F',
  textFill: 'white'
}, {
  nameRegexp: /^[I-L]/i,
  bgFill: '#D8213A',
  textFill: 'white'
}, {
  nameRegexp: /^[M-P]/i,
  bgFill: '#E9852C',
  textFill: 'white'
}, {
  nameRegexp: /^[Q-T]/i,
  bgFill: '#FBCB22',
  textFill: 'black'
}, {
  nameRegexp: /^[U-X]/i,
  bgFill: '#00773F',
  textFill: 'white'
}, {
  nameRegexp: /^[Y-Z]/i,
  bgFill: '#1C8FC2',
  textFill: 'white'
}];

// https://github.com/bhovhannes/svg-url-loader/blob/4bfa8519/index.js
/* eslint-disable */
var convertSvgToDataUri = function convertSvgToDataUri(html) {
  var data = html.replace(/\n/g, '').replace(/"/g, "'").replace(/\s+/g, " ").replace(/[{}\|\\\^~\[\]`"<>#%]/g, function (match) {
    return '%' + match[0].charCodeAt(0).toString(16).toUpperCase();
  });
  data = 'data:image/svg+xml;charset=utf8,' + data.trim();
  return data;
};
/* eslint-enable */

var generatePlaceholderSvgXml = exports.generatePlaceholderSvgXml = function generatePlaceholderSvgXml(userFirstName, userLastName, forcedBgFill, forcedTextFill) {
  var userFirstNameOrEmpty = _is_js2.default.string(userFirstName) && _is_js2.default.not.empty(userFirstName) ? userFirstName : '?';
  var userLastNameOrEmpty = _is_js2.default.string(userLastName) && _is_js2.default.not.empty(userLastName) ? userLastName : '?';
  var userFirstInitial = userFirstNameOrEmpty.charAt(0).toUpperCase();
  var userLastInitial = userLastNameOrEmpty.charAt(0).toUpperCase();
  var colorSpec = COLOR_SPECS.find(function (m) {
    return m.nameRegexp.test(userFirstNameOrEmpty);
  }) || {};
  // `dy` ref: http://stackoverflow.com/a/31376501
  return '<svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">\n    <rect width="100%" height="100%" fill="' + (forcedBgFill || colorSpec.bgFill || '#FFF') + '" />\n    <text fill="' + (forcedTextFill || colorSpec.textFill || '#000') + '"\n        font-size="14px"\n        font-weight="bold"\n        font-family="Helvetica"\n        text-anchor="middle"\n        x="50%" y="50%" dy=".35em">\n      ' + (userFirstInitial || '?') + (userLastInitial || '?') + '\n    </text>\n  </svg>';
};

var generatePlaceholderSvgDataUri = exports.generatePlaceholderSvgDataUri = function generatePlaceholderSvgDataUri(userFirstName, userLastName, forcedBgFill, forcedTextFill) {
  return convertSvgToDataUri(generatePlaceholderSvgXml(userFirstName, userLastName, forcedBgFill, forcedTextFill));
};

exports.default = generatePlaceholderSvgDataUri;
//# sourceMappingURL=generateUserInitialsAvatarSvg.js.map
