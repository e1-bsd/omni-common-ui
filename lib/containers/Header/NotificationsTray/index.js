'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutableCursor = require('immutable-cursor');

var _immutableCursor2 = _interopRequireDefault(_immutableCursor);

var _Config = require('./../../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _connect = require('./../../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _Icon = require('./../../../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Callout = require('./../../../components/Callout');

var _Callout2 = _interopRequireDefault(_Callout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationsTray = function (_PureComponent) {
  _inherits(NotificationsTray, _PureComponent);

  function NotificationsTray() {
    _classCallCheck(this, NotificationsTray);

    var _this = _possibleConstructorReturn(this, (NotificationsTray.__proto__ || Object.getPrototypeOf(NotificationsTray)).call(this));

    _this.state = { open: false };
    _this._renderCalloutPopupContent = _this._renderCalloutPopupContent.bind(_this);
    return _this;
  }

  _createClass(NotificationsTray, [{
    key: '_renderCalloutPopupContent',
    value: function _renderCalloutPopupContent() {
      var notifications = this.props.notifications;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: _style2.default.NotificationsTray_popup_heading },
          _react2.default.createElement(
            'h2',
            null,
            'Notifications'
          )
        ),
        !notifications || !notifications.size ? _react2.default.createElement(
          'div',
          { className: _style2.default.NotificationsTray_popup_empty },
          _react2.default.createElement(
            'h1',
            null,
            'Hello!'
          ),
          _react2.default.createElement(
            'p',
            null,
            'You don\'t have any notifications yet.'
          ),
          _react2.default.createElement(
            'aside',
            null,
            'New notifications will appear here when',
            _react2.default.createElement('br', null),
            'teachers add internal notes for your students.'
          )
        ) : null,
        notifications && notifications.size ? _react2.default.createElement(
          'ul',
          { className: _style2.default.NotificationsTray_popup_list },
          notifications.map(function (notification) {
            return _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'div',
                { className: _style2.default.NotificationsTray_notification },
                _react2.default.createElement(
                  'span',
                  { className: _style2.default.NotificationsTray_notification_blurb },
                  notification.blurb
                ),
                _react2.default.createElement(
                  'span',
                  { className: _style2.default.NotificationsTray_notification_time },
                  notification.moment.fromNow()
                ),
                _react2.default.createElement(_Icon2.default, { className: _style2.default.NotificationsTray_notification_chevron,
                  id: 'chevron-small-right' })
              )
            );
          })
        ) : null
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Callout2.default,
        { content: this._renderCalloutPopupContent(),
          popupClassName: _style2.default.NotificationsTray_popup },
        _react2.default.createElement(
          'div',
          { className: _style2.default.NotificationsTray },
          _react2.default.createElement(_Icon2.default, { className: _style2.default.NotificationsTray_icon,
            id: 'bell' })
        )
      );
    }
  }]);

  return NotificationsTray;
}(_react.PureComponent);

NotificationsTray.propTypes = {
  notifications: _react2.default.PropTypes.shape({
    map: _react2.default.PropTypes.func.isRequired
  })
};

function mapStateToProps(state) {
  var path = _Config2.default.get('notificationsTray').source;
  var notifications = _immutableCursor2.default.from(state, path).deref();
  return { notifications: notifications };
}

exports.default = (0, _connect2.default)(mapStateToProps)(NotificationsTray);
//# sourceMappingURL=index.js.map
