import styles from './style.postcss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Set } from 'immutable';
import Cursor from 'immutable-cursor';
import { CSSTransitionGroup } from 'react-transition-group';
import classnames from 'classnames';
import { fetch, buildUrl } from 'domain/Api';
import Config from 'domain/Config';
import createApiActionCreator from 'domain/createApiActionCreator';
import connect from 'domain/connect';
import Icon from 'components/Icon';
import Callout from 'components/Callout';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

class NotificationsTray extends PureComponent {
  constructor() {
    super();
    this.state = {
      viewingNotification: null,
      isMarkingMode: false,
      notificationIdsToMarkRead: new Set(),
    };
    this._onNotificationClicked = this._onNotificationClicked.bind(this);
    this._onClickBackToNotifications = this._onClickBackToNotifications.bind(this);
    this._onCalloutOpenStateChanged = this._onCalloutOpenStateChanged.bind(this);
    this._renderCalloutPopupContent = this._renderCalloutPopupContent.bind(this);
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
    return this.setState({ viewingNotification: this.props.notifications.get(notificationId) });
  }

  _onClickBackToNotifications() {
    this.setState({ viewingNotification: null });
  }

  _onCalloutOpenStateChanged(isOpen) {
    if (! isOpen || ! this.state.viewingNotification) return;
    this.setState({ viewingNotification: null });
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

  _renderNotifications(notifications) {
    if (notifications && notifications.size) {
      return <ul className={styles.NotificationsTray_popup_list}>
        {notifications.map((notification, notificationId) =>
          this._renderNotification(notification, notificationId)
        )}

      </ul>;
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

  _renderCalloutPopupContent() {
    const { notifications } = this.props;
    const { viewingNotification } = this.state;
    const headerBtnClassName = classnames(styles.NotificationsTray_popup_heading_btn, {
      [styles.__inactive]: !! this.state.isMarkingMode,
    });
    return <div>
      <div className={classnames(styles.NotificationsTray_popup_slide, {
        [styles.__active]: ! this.state.viewingNotification,
        [styles.__previous]: !! this.state.viewingNotification,
      })}>
        <div className={styles.NotificationsTray_popup_heading}>
          <h2>Notifications</h2>
          {notifications && notifications.size ?
            <a className={headerBtnClassName}
                onClick={this._onMarkAsReadClick}
                role="button"
                tabIndex="-1">
              Mark as read
            </a> : null}
        </div>
        {! notifications || ! notifications.size ?
          <div className={styles.NotificationsTray_popup_empty}>
            <h1>Hello!</h1>
            <p>You don't have any notifications yet.</p>
            <aside>New notifications will appear here when <br />
              teachers add internal notes for your students.</aside>
          </div> : null}
        {this._renderNotifications(notifications)}
        {this._renderNotificationFooter(notifications)}
      </div>
      <div className={classnames(styles.NotificationsTray_popup_slide, {
        [styles.__active]: !! this.state.viewingNotification,
      })}>
        <div className={classnames(styles.NotificationsTray_popup_heading, styles.__clickable)}
            onClick={this._onClickBackToNotifications}
            role="button"
            tabIndex="-1">
          <div className={styles.NotificationsTray_popup_heading_secondary}>
            <Icon className={styles.NotificationsTray_popup_heading_chevron}
                id="chevron-small-left" />
            <h2>Back to notifications</h2>
          </div>
        </div>
        {viewingNotification && viewingNotification.getNotificationViewNode &&
            viewingNotification.getNotificationViewNode(this)}
      </div>
    </div>;
  }

  close() {
    if (! this._callout) return;
    this._callout.close();
  }

  render() {
    const { notifications } = this.props;
    return <Callout popupClassName={styles.NotificationsTray_popup}
        content={this._renderCalloutPopupContent()}
        onOpenStateChanged={this._onCalloutOpenStateChanged}
        ref={(comp) => { this._callout = comp; }}>
      <div className={styles.NotificationsTray}>
        <Icon className={styles.NotificationsTray_icon}
            id="bell" />
        <CSSTransitionGroup transitionName="bubble"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
          {notifications && notifications.size ?
            <aside className={styles.NotificationsTray_bubble}>
              {notifications.size > 99 ? '…' : notifications.size}
            </aside> : null}
        </CSSTransitionGroup>
      </div>
    </Callout>;
  }
}

NotificationsTray.propTypes = {
  notifications: PropTypes.shape({
    map: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
  }),
  accessToken: PropTypes.string,
  markNotificationAsRead: PropTypes.func,
};

function mapStateToProps(state) {
  const path = Config.get('notificationsTray').source;
  const notifications = Cursor.from(state, path).deref();
  return { notifications };
}

function mapDispatchToProps(dispatch) {
  const markAsReadDispatchConfig = Config.get('notificationsTray').markAsRead.dispatch;
  const apiUrl = buildUrl(markAsReadDispatchConfig.apiUrl);
  const method = markAsReadDispatchConfig.method;
  return {
    markNotificationAsRead: (notificationIds) => {
      const data = JSON.stringify(notificationIds.map((id) => {
        const model = { id };
        return model;
      }));
      const actionCreator = createApiActionCreator({
        actionObjectName: 'MARK_NOTIFICATIONS_READ',  // SUBMIT_MARK_NOTIFICATIONS_READ_REQUEST, SUBMIT_..._SUCCESS
        url: apiUrl,
        method,
        requestExtras: {
          disableDefault: true,
          payload: fetch(apiUrl, {
            method,
            body: data,
          }),
          notificationIds,
        },
        successExtras: { disableDefault: true, notificationIds },
        failureExtras: { disableDefault: true, notificationIds },
      });
      actionCreator(dispatch);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsTray);
