'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _immutableCursor = require('immutable-cursor');

var _immutableCursor2 = _interopRequireDefault(_immutableCursor);

var _reactTransitionGroup = require('react-transition-group');

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _Api = require('./../../../domain/Api');

var _Config = require('./../../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _createApiActionCreator = require('./../../../domain/createApiActionCreator');

var _createApiActionCreator2 = _interopRequireDefault(_createApiActionCreator);

var _connect = require('./../../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _Icon = require('./../../../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Callout = require('./../../../components/Callout');

var _Callout2 = _interopRequireDefault(_Callout);

var _Button = require('./../../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Checkbox = require('./../../../components/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationsTray = function (_PureComponent) {
  _inherits(NotificationsTray, _PureComponent);

  function NotificationsTray() {
    _classCallCheck(this, NotificationsTray);

    var _this = _possibleConstructorReturn(this, (NotificationsTray.__proto__ || Object.getPrototypeOf(NotificationsTray)).call(this));

    _this.state = {
      viewingNotification: null,
      isMarkingMode: false,
      notificationIdsToMarkRead: new _immutable.Set()
    };
    _this._onNotificationClicked = _this._onNotificationClicked.bind(_this);
    _this._onClickBackToNotifications = _this._onClickBackToNotifications.bind(_this);
    _this._onCalloutOpenStateChanged = _this._onCalloutOpenStateChanged.bind(_this);
    _this._renderCalloutPopupContent = _this._renderCalloutPopupContent.bind(_this);
    _this._onMarkAsReadClick = _this._onMarkAsReadClick.bind(_this);
    _this._onCancelClick = _this._onCancelClick.bind(_this);
    _this._onMarkClick = _this._onMarkClick.bind(_this);
    return _this;
  }

  _createClass(NotificationsTray, [{
    key: '_onNotificationClicked',
    value: function _onNotificationClicked(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var element = ev.currentTarget;
      var notificationId = element.dataset.notificationId;


      if (this.state.isMarkingMode) {
        if (!this.state.notificationIdsToMarkRead.has(notificationId)) {
          return this.setState({
            notificationIdsToMarkRead: this.state.notificationIdsToMarkRead.add(notificationId)
          });
        }
        return this.setState({
          notificationIdsToMarkRead: this.state.notificationIdsToMarkRead.delete(notificationId)
        });
      }
      return this.setState({ viewingNotification: this.props.notifications.get(notificationId) });
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
    key: '_onMarkAsReadClick',
    value: function _onMarkAsReadClick() {
      if (!this.state.isMarkingMode) {
        this.setState({
          isMarkingMode: true
        });
      }
    }
  }, {
    key: '_onCancelClick',
    value: function _onCancelClick() {
      this.setState({
        isMarkingMode: false
      });
    }
  }, {
    key: '_onMarkClick',
    value: function _onMarkClick() {
      if (this.state.notificationIdsToMarkRead.size !== 0) {
        this.props.markNotificationAsRead(this.state.notificationIdsToMarkRead);
      }
      this.setState({
        notificationIdsToMarkRead: new _immutable.Set(),
        isMarkingMode: false
      });
    }
  }, {
    key: '_renderNotificationCheckbox',
    value: function _renderNotificationCheckbox(notificationId) {
      if (this.state.isMarkingMode) {
        return _react2.default.createElement(_Checkbox2.default, { name: notificationId,
          checked: this.state.notificationIdsToMarkRead.includes(notificationId),
          className: _style2.default.NotificationsTray_notification_checkbox,
          id: notificationId });
      }
      return null;
    }
  }, {
    key: '_renderNotification',
    value: function _renderNotification(notification, notificationId) {
      return _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'div',
          { className: _style2.default.NotificationsTray_notification,
            onClick: this._onNotificationClicked,
            'data-notification-id': notificationId,
            role: 'button',
            tabIndex: '0' },
          this._renderNotificationCheckbox(notificationId),
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
    }
  }, {
    key: '_renderNotifications',
    value: function _renderNotifications(notifications) {
      var _this2 = this;

      if (notifications && notifications.size) {
        return _react2.default.createElement(
          'ul',
          { className: _style2.default.NotificationsTray_popup_list },
          notifications.map(function (notification, notificationId) {
            return _this2._renderNotification(notification, notificationId);
          })
        );
      }
      return null;
    }
  }, {
    key: '_onCheckAllNotifications',
    value: function _onCheckAllNotifications(checked, notifications) {
      if (checked) {
        this.setState({
          notificationIdsToMarkRead: [].concat(_toConsumableArray(notifications.keys()))
        });
      } else {
        this.setState({
          notificationIdsToMarkRead: []
        });
      }
    }
  }, {
    key: '_renderNotificationFooter',
    value: function _renderNotificationFooter(notifications) {
      var _this3 = this;

      if (this.state.isMarkingMode) {
        return _react2.default.createElement(
          'div',
          { className: _style2.default.NotificationsTray_notification_footer },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_Checkbox2.default, { name: 'check-all',
              id: 'check-all',
              checked: this.state.notificationIdsToMarkRead.length === notifications.size,
              onChange: function onChange(checked) {
                _this3._onCheckAllNotifications(checked, notifications);
              },
              className: _style2.default.NotificationsTray_notification_footer_checkAll }),
            _react2.default.createElement(
              'span',
              null,
              'All'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _style2.default.NotificationsTray_notification_footer_btns },
            _react2.default.createElement(
              _Button2.default,
              { type: _Button2.default.Type.default,
                className: _style2.default.NotificationsTray_notification_footer_cancel,
                onClick: this._onCancelClick },
              'Cancel'
            ),
            _react2.default.createElement(
              _Button2.default,
              { type: _Button2.default.Type.primary,
                className: _style2.default.NotificationsTray_notification_footer_mark,
                onClick: this._onMarkClick },
              'Mark'
            )
          )
        );
      }
      return null;
    }
  }, {
    key: '_renderCalloutPopupContent',
    value: function _renderCalloutPopupContent() {
      var _classnames2;

      var notifications = this.props.notifications;
      var viewingNotification = this.state.viewingNotification;

      var headerBtnClassName = (0, _classnames5.default)(_style2.default.NotificationsTray_popup_heading_btn, _defineProperty({}, _style2.default.__inActive, this.state.isMarkingMode));
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: (0, _classnames5.default)(_style2.default.NotificationsTray_popup_slide, (_classnames2 = {}, _defineProperty(_classnames2, _style2.default.__active, !this.state.viewingNotification), _defineProperty(_classnames2, _style2.default.__previous, !!this.state.viewingNotification), _classnames2)) },
          _react2.default.createElement(
            'div',
            { className: _style2.default.NotificationsTray_popup_heading },
            _react2.default.createElement(
              'h2',
              null,
              'Notifications'
            ),
            _react2.default.createElement(
              'a',
              { className: headerBtnClassName,
                onClick: this._onMarkAsReadClick },
              'Mark as read'
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
          this._renderNotifications(notifications),
          this._renderNotificationFooter(notifications)
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames5.default)(_style2.default.NotificationsTray_popup_slide, _defineProperty({}, _style2.default.__active, !!this.state.viewingNotification)) },
          _react2.default.createElement(
            'div',
            { className: (0, _classnames5.default)(_style2.default.NotificationsTray_popup_heading, _style2.default.__clickable),
              onClick: this._onClickBackToNotifications,
              role: 'button',
              tabIndex: '-1' },
            _react2.default.createElement(
              'div',
              { className: _style2.default.NotificationsTray_popup_heading_secondary },
              _react2.default.createElement(_Icon2.default, { className: _style2.default.NotificationsTray_popup_heading_chevron,
                id: 'chevron-small-left' }),
              _react2.default.createElement(
                'h2',
                null,
                'Back to notifications'
              )
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
      var _this4 = this;

      var notifications = this.props.notifications;

      return _react2.default.createElement(
        _Callout2.default,
        { popupClassName: _style2.default.NotificationsTray_popup,
          content: this._renderCalloutPopupContent(),
          onOpenStateChanged: this._onCalloutOpenStateChanged,
          ref: function ref(comp) {
            _this4._callout = comp;
          } },
        _react2.default.createElement(
          'div',
          { className: _style2.default.NotificationsTray },
          _react2.default.createElement(_Icon2.default, { className: _style2.default.NotificationsTray_icon,
            id: 'bell' }),
          _react2.default.createElement(
            _reactTransitionGroup.CSSTransitionGroup,
            { transitionName: 'bubble',
              transitionEnterTimeout: 500,
              transitionLeaveTimeout: 500 },
            notifications && notifications.size ? _react2.default.createElement(
              'aside',
              { className: _style2.default.NotificationsTray_bubble },
              notifications.size > 99 ? '…' : notifications.size
            ) : null
          )
        )
      );
    }
  }]);

  return NotificationsTray;
}(_react.PureComponent);

NotificationsTray.propTypes = {
  notifications: _propTypes2.default.shape({
    map: _propTypes2.default.func.isRequired,
    get: _propTypes2.default.func.isRequired
  }),
  accessToken: _propTypes2.default.string,
  markNotificationAsRead: _propTypes2.default.func
};

function mapStateToProps(state) {
  var path = _Config2.default.get('notificationsTray').source;
  var notifications = _immutableCursor2.default.from(state, path).deref();
  return { notifications: notifications };
}

function mapDispatchToProps(dispatch) {
  var markAsReadDispatchConfig = _Config2.default.get('notificationsTray').markAsRead.dispatch;
  var apiUrl = (0, _Api.buildUrl)(markAsReadDispatchConfig.apiUrl);
  var method = markAsReadDispatchConfig.method;
  return {
    markNotificationAsRead: function markNotificationAsRead(notificationIds) {
      var data = JSON.stringify(notificationIds.map(function (id) {
        var model = { id: id };
        return model;
      }));
      var actionCreator = (0, _createApiActionCreator2.default)({
        actionObjectName: 'MARK_NOTIFICATIONS_READ', // SUBMIT_MARK_NOTIFICATIONS_READ_REQUEST, SUBMIT_..._SUCCESS
        url: apiUrl,
        method: method,
        requestExtras: {
          disableDefault: true,
          payload: (0, _Api.fetch)(apiUrl, {
            method: method,
            body: data
          }),
          notificationIds: notificationIds
        },
        successExtras: { disableDefault: true, notificationIds: notificationIds },
        failureExtras: { disableDefault: true, notificationIds: notificationIds }
      });
      actionCreator(dispatch);
    }
  };
}

exports.default = (0, _connect2.default)(mapStateToProps, mapDispatchToProps)(NotificationsTray);
//# sourceMappingURL=index.js.map
