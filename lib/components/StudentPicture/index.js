'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StudentPicture = undefined;

var _defaultAvatarMale = require('./default-avatar-male.svg');

var _defaultAvatarMale2 = _interopRequireDefault(_defaultAvatarMale);

var _defaultAvatarFemale = require('./default-avatar-female.svg');

var _defaultAvatarFemale2 = _interopRequireDefault(_defaultAvatarFemale);

var _defaultAvatar = require('./default-avatar.svg');

var _defaultAvatar2 = _interopRequireDefault(_defaultAvatar);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _Avatar = require('./../Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StudentPicture = exports.StudentPicture = function StudentPicture(_ref) {
    var src = _ref.src,
        className = _ref.className,
        gender = _ref.gender;
    return _react2.default.createElement(_Avatar2.default, { src: src,
        'default': _defaultAvatar2.default,
        defaultMale: _defaultAvatarMale2.default,
        defaultFemale: _defaultAvatarFemale2.default,
        className: className,
        gender: gender });
};

StudentPicture.propTypes = {
    gender: _propTypes2.default.string,
    src: _propTypes2.default.string,
    className: _propTypes2.default.string
};

exports.default = (0, _recompose.pure)(StudentPicture);
//# sourceMappingURL=index.js.map
