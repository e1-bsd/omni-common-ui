import styles from './style.postcss';

import React, { PureComponent } from 'react';
import Cursor from 'immutable-cursor';
import { CSSTransitionGroup } from 'react-transition-group';
import classnames from 'classnames';
import Config from 'domain/Config';
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
      notificationIdsToMarkRead: [],
    };
    this._onNotificationClicked = this._onNotificationClicked.bind(this);
    this._onClickBackToNotifications = this._onClickBackToNotifications.bind(this);
    this._onCalloutOpenStateChanged = this._onCalloutOpenStateChanged.bind(this);
    this._renderCalloutPopupContent = this._renderCalloutPopupContent.bind(this);
  }

  _onNotificationClicked(ev) {
    const element = ev.currentTarget;
    const { notificationId } = element.dataset;
    if (this.state.isMarkingMode) {
      if (! this.state.notificationIdsToMarkRead.includes(notificationId)) {
        const notificationIds = [...this.state.notificationIdsToMarkRead, notificationId];
        this.setState({
          notificationIdsToMarkRead: notificationIds,
        });
      } else {
        const notificationIds = [...this.state.notificationIdsToMarkRead.filter(
          (id) => id !== notificationId
        )];
        this.setState({
          notificationIdsToMarkRead: notificationIds,
        });
      }
      console.log('dega', this.state.notificationIdsToMarkRead);
    } else {
      this.setState({ viewingNotification: this.props.notifications.get(notificationId) });
    }
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
    console.log('dega', this.state.notificationIdsToMarkRead);
    this.setState({
      notificationIdsToMarkRead: [],
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
        notificationIdsToMarkRead: [...notifications.keys()],
      });
    } else {
      this.setState({
        notificationIdsToMarkRead: [],
      });
    }
  }

  _renderNotificationFooter(notifications) {
    if (this.state.isMarkingMode) {
      return <div className={styles.NotificationsTray_notification_footer}>
        <div>
          <Checkbox name="check-all"
              id="check-all"
              checked={this.state.notificationIdsToMarkRead.length === notifications.size}
              onChange={(checked) => { this._onCheckAllNotifications(checked, notifications); }}
              className={styles.NotificationsTray_notification_footer_checkAll} />
          <span>All</span>
        </div>
        <div className={styles.NotificationsTray_notification_footer_btns}>
          <Button type={Button.Type.default}
              className={styles.NotificationsTray_notification_footer_cancel}
              onClick={() => this._onCancelClick()}>
            Cancel
          </Button>
          <Button type={Button.Type.primary}
              className={styles.NotificationsTray_notification_footer_mark}
              onClick={() => this._onMarkClick()}>
            Mark
          </Button>
        </div>
      </div>;
    }
    return null;
  }

  _renderCalloutPopupContent() {
    const { notifications } = this.props;
    const { viewingNotification } = this.state;
    const headerBtnClassName = this.state.isMarkingMode ?
      classnames(styles.NotificationsTray_popup_heading_btn,
        styles.NotificationsTray_popup_heading_btn_inActive) :
      styles.NotificationsTray_popup_heading_btn;
    return <div>
      <div className={classnames(styles.NotificationsTray_popup_slide, {
        [styles.__active]: ! this.state.viewingNotification,
        [styles.__previous]: !! this.state.viewingNotification,
      })}>
        <div className={styles.NotificationsTray_popup_heading}>
          <h2>Notifications</h2>
          <a className={headerBtnClassName}
              onClick={() => this._onMarkAsReadClick()}>Mark as read</a>
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
  notifications: React.PropTypes.shape({
    map: React.PropTypes.func.isRequired,
    get: React.PropTypes.func.isRequired,
  }),
};

function mapStateToProps(state) {
  const path = Config.get('notificationsTray').source;
  const notifications = Cursor.from(state, path).deref();
  return { notifications };
}

export default connect(mapStateToProps)(NotificationsTray);
