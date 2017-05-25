'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _Gender = require('./../../domain/Gender');

var _Gender2 = _interopRequireDefault(_Gender);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _generateUserInitialsAvatarSvg = require('./generateUserInitialsAvatarSvg');

var _generateUserInitialsAvatarSvg2 = _interopRequireDefault(_generateUserInitialsAvatarSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Avatar = function (_PureComponent) {
  _inherits(Avatar, _PureComponent);

  function Avatar(props) {
    _classCallCheck(this, Avatar);

    var _this = _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call(this, props));

    _this._setUp(props);
    return _this;
  }

  _createClass(Avatar, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props) {
      this._setUp(props);
    }
  }, {
    key: '_setUp',
    value: function _setUp(props) {
      this._default = this._getDefaultAvatar(props);

      var images = [];
      images.push(this._getCssValueForUrl(props.src));
      images.push(this._getCssValueForUrl(this._default));
      this._style = { backgroundImage: images.filter(function (e) {
          return _is_js2.default.string(e);
        }).join(', ') };
    }
  }, {
    key: '_getDefaultAvatar',
    value: function _getDefaultAvatar(props) {
      if (props.displayUserInitialsAsDefaultAvatar) {
        return (0, _generateUserInitialsAvatarSvg2.default)(props.userFirstName, props.userLastName);
      }

      if (_Gender2.default.isMale(props.gender)) {
        return props.defaultMale || props.default;
      }

      if (_Gender2.default.isFemale(props.gender)) {
        return props.defaultFemale || props.default;
      }

      return props.default;
    }
  }, {
    key: '_getCssValueForUrl',
    value: function _getCssValueForUrl(url) {
      if (_is_js2.default.not.string(url)) {
        return null;
      }

      // don't let http images crash the party
      var secureUrl = url.replace(/^http:/, ''); // //host/path uses current protocol
      return _is_js2.default.not.empty(url) && 'url("' + secureUrl + '")';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { style: this._style, className: (0, _classnames2.default)(_style2.default.Avatar, this.props.className) });
    }
  }]);

  return Avatar;
}(_react.PureComponent);

Avatar.propTypes = {
  className: _propTypes2.default.string,
  src: _propTypes2.default.string,
  default: _propTypes2.default.string,
  defaultMale: _propTypes2.default.string,
  defaultFemale: _propTypes2.default.string,
  gender: _propTypes2.default.string,
  userFirstName: _propTypes2.default.string,
  userLastName: _propTypes2.default.string,
  displayUserInitialsAsDefaultAvatar: _propTypes2.default.bool
};

exports.default = Avatar;
//# sourceMappingURL=index.js.map
