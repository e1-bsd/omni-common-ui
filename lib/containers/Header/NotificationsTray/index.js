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

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Config = require('./../../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _connect = require('./../../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _Icon = require('./../../../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Callout = require('./../../../components/Callout');

var _Callout2 = _interopRequireDefault(_Callout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationsTray = function (_PureComponent) {
  _inherits(NotificationsTray, _PureComponent);

  function NotificationsTray() {
    _classCallCheck(this, NotificationsTray);

    var _this = _possibleConstructorReturn(this, (NotificationsTray.__proto__ || Object.getPrototypeOf(NotificationsTray)).call(this));

    _this.state = { viewingNotification: null };
    _this._onNotificationClicked = _this._onNotificationClicked.bind(_this);
    _this._onClickBackToNotifications = _this._onClickBackToNotifications.bind(_this);
    _this._onCalloutOpenStateChanged = _this._onCalloutOpenStateChanged.bind(_this);
    _this._renderCalloutPopupContent = _this._renderCalloutPopupContent.bind(_this);
    return _this;
  }

  _createClass(NotificationsTray, [{
    key: '_onNotificationClicked',
    value: function _onNotificationClicked(ev) {
      var element = ev.currentTarget;
      var notificationId = element.dataset.notificationId;

      this.setState({ viewingNotification: this.props.notifications.get(notificationId) });
    }
  }, {
    key: '_onClickBackToNotifications',
    value: function _onClickBackToNotifications() {
      this.setState({ viewingNotification: null });
    }
  }, {
    key: '_onCalloutOpenStateChanged',
    value: function _onCalloutOpenStateChanged(isOpen) {
      if (!isOpen || !this.state.viewingNotification) return;
      this.setState({ viewingNotification: null });
    }
  }, {
    key: '_renderCalloutPopupContent',
    value: function _renderCalloutPopupContent() {
      var _classnames,
          _this2 = this;

      var notifications = this.props.notifications;
      var viewingNotification = this.state.viewingNotification;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: (0, _classnames4.default)(_style2.default.NotificationsTray_popup_slide, (_classnames = {}, _defineProperty(_classnames, _style2.default.__active, !this.state.viewingNotification), _defineProperty(_classnames, _style2.default.__previous, !!this.state.viewingNotification), _classnames)) },
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
              'New notifications will appear here when ',
              _react2.default.createElement('br', null),
              'teachers add internal notes for your students.'
            )
          ) : null,
          notifications && notifications.size ? _react2.default.createElement(
            'ul',
            { className: _style2.default.NotificationsTray_popup_list },
            notifications.map(function (notification, notificationId) {
              return _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'div',
                  { className: _style2.default.NotificationsTray_notification,
                    onClick: _this2._onNotificationClicked,
                    'data-notification-id': notificationId,
                    role: 'button',
                    tabIndex: '0' },
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
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames4.default)(_style2.default.NotificationsTray_popup_slide, _defineProperty({}, _style2.default.__active, !!this.state.viewingNotification)) },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames4.default)(_style2.default.NotificationsTray_popup_heading, _style2.default.__clickable),
              onClick: this._onClickBackToNotifications,
              role: 'button',
              tabIndex: '-1' },
            _react2.default.createElement(_Icon2.default, { className: _style2.default.NotificationsTray_popup_heading_chevron,
              id: 'chevron-small-left' }),
            _react2.default.createElement(
              'h2',
              null,
              'Back to notifications'
            )
          ),
          viewingNotification && viewingNotification.getNotificationViewNode && viewingNotification.getNotificationViewNode(this)
        )
      );
    }
  }, {
    key: 'close',
    value: function close() {
      if (!this._callout) return;
      this._callout.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _Callout2.default,
        { popupClassName: _style2.default.NotificationsTray_popup,
          content: this._renderCalloutPopupContent(),
          onOpenStateChanged: this._onCalloutOpenStateChanged,
          ref: function ref(comp) {
            _this3._callout = comp;
          } },
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
    map: _react2.default.PropTypes.func.isRequired,
    get: _react2.default.PropTypes.func.isRequired
  })
};

function mapStateToProps(state) {
  var path = _Config2.default.get('notificationsTray').source;
  var notifications = _immutableCursor2.default.from(state, path).deref();
  return { notifications: notifications };
}

exports.default = (0, _connect2.default)(mapStateToProps)(NotificationsTray);
//# sourceMappingURL=index.js.map
