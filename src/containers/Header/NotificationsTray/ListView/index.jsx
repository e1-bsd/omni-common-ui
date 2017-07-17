import styles from '../style.postcss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Set } from 'immutable';
import classnames from 'classnames';
import is from 'is_js';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

class ListView extends PureComponent {
  constructor() {
    super();
    this.state = {
      isMarkingMode: false,
      notificationIdsToMarkRead: new Set(),
    };
    this._onNotificationClicked = this._onNotificationClicked.bind(this);
    this._onMarkAsReadClick = this._onMarkAsReadClick.bind(this);
    this._onCancelClick = this._onCancelClick.bind(this);
    this._onMarkClick = this._onMarkClick.bind(this);
  }

  _onNotificationClicked(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const element = ev.currentTarget;
    const { notificationId } = element.dataset;

    if (this.state.isMarkingMode) {
      if (! this.state.notificationIdsToMarkRead.has(notificationId)) {
        return this.setState({
          notificationIdsToMarkRead: this.state.notificationIdsToMarkRead.add(notificationId),
        });
      }
      return this.setState({
        notificationIdsToMarkRead: this.state.notificationIdsToMarkRead.delete(notificationId),
      });
    }
    return this.props.onViewNotification(notificationId);
  }

  _onMarkAsReadClick() {
    if (! this.state.isMarkingMode) {
      this.setState({
        isMarkingMode: true,
      });
    }
  }

  _onCancelClick() {
    this.setState({
      isMarkingMode: false,
    });
  }

  _onMarkClick() {
    if (this.state.notificationIdsToMarkRead.size !== 0) {
      this.props.markNotificationAsRead(this.state.notificationIdsToMarkRead);
    }
    this.setState({
      notificationIdsToMarkRead: new Set(),
      isMarkingMode: false,
    });
  }

  _renderNotificationCheckbox(notificationId) {
    if (this.state.isMarkingMode) {
      return <Checkbox name={notificationId}
          checked={this.state.notificationIdsToMarkRead.includes(notificationId)}
          className={styles.NotificationsTray_notification_checkbox}
          id={notificationId} />;
    }
    return null;
  }


  _renderMarkAsReadButton(notifications) {
    if (is.existy(notifications) && notifications.size !== 0) {
      const headerBtnClassName = classnames(styles.NotificationsTray_popup_heading_btn, {
        [styles.__inactive]: !! this.state.isMarkingMode,
      });
      return <a className={headerBtnClassName}
          onClick={this._onMarkAsReadClick}
          role="button"
          tabIndex="-1">
        Mark as read
      </a>;
    }
    return null;
  }

  _onCheckAllNotifications(checked, notifications) {
    if (checked) {
      this.setState({
        notificationIdsToMarkRead: new Set([...notifications.keys()]),
      });
    } else {
      this.setState({
        notificationIdsToMarkRead: new Set(),
      });
    }
  }

  _renderNotifications(notifications) {
    if (notifications && notifications.size !== 0) {
      return <ul className={styles.NotificationsTray_popup_list}>
        {notifications.map((notification, notificationId) =>
          this._renderNotification(notification, notificationId)
        )}
      </ul>;
    }
    return <div className={styles.NotificationsTray_popup_empty}>
      <h1>Hello!</h1>
      <p>You don't have any notifications yet.</p>
      <aside>New notifications will appear here when <br />
      teachers add internal notes for your students.</aside>
    </div>;
  }

  _renderNotification(notification, notificationId) {
    return <li>
      <div className={styles.NotificationsTray_notification}
          onClick={this._onNotificationClicked}
          data-notification-id={notificationId}
          role="button"
          tabIndex="0">
        {this._renderNotificationCheckbox(notificationId)}
        <span className={styles.NotificationsTray_notification_blurb}>
          {notification.blurb}
        </span>
        <span className={styles.NotificationsTray_notification_time}>
          {notification.moment.fromNow()}
        </span>
        <Icon className={styles.NotificationsTray_notification_chevron}
            id="chevron-small-right" />
      </div>
    </li>;
  }

  _renderNotificationFooter(notifications) {
    if (this.state.isMarkingMode) {
      return <div className={styles.NotificationsTray_notification_footer}>
        <label className={styles.NotificationsTray_notification_footer_checkAll}>
          <Checkbox name="check-all"
              id="check-all"
              checked={this.state.notificationIdsToMarkRead.size === notifications.size}
              onChange={(checked) => { this._onCheckAllNotifications(checked, notifications); }} />
          <span>All</span>
        </label>
        <Button.Container className={styles.NotificationsTray_notification_footer_btns}
            align="right">
          <Button type={Button.Type.default}
              className={styles.NotificationsTray_notification_footer_cancel}
              onClick={this._onCancelClick}>
            Cancel
          </Button>
          <Button type={Button.Type.primary}
              className={styles.NotificationsTray_notification_footer_mark}
              onClick={this._onMarkClick}
              disabled={this.state.notificationIdsToMarkRead.size === 0}>
            Mark
          </Button>
        </Button.Container>
      </div>;
    }
    return null;
  }

  render() {
    const { notifications, isListMode } = this.props;
    return <div className={classnames(styles.NotificationsTray_popup_slide, {
      [styles.__active]: isListMode,
      [styles.__previous]: ! isListMode,
    })}>
      {this._renderMarkAsReadButton(notifications)}
      {this._renderNotifications(notifications)}
      {this._renderNotificationFooter(notifications)}
    </div>;
  }
}

ListView.propTypes = {
  notifications: PropTypes.shape({
    map: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
  }),
  isListMode: PropTypes.bool,
  markNotificationAsRead: PropTypes.func,
  onViewNotification: PropTypes.func,
};

export default ListView;
