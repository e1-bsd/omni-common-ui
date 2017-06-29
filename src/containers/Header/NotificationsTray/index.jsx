import styles from './style.postcss';

import React, { PureComponent } from 'react';
import Cursor from 'immutable-cursor';
import classnames from 'classnames';
import Config from 'domain/Config';
import connect from 'domain/connect';
import Icon from 'components/Icon';
import Callout from 'components/Callout';

class NotificationsTray extends PureComponent {
  constructor() {
    super();
    this.state = {
      open: false,
      viewingNotification: null,
    };
    this._onNotificationClicked = this._onNotificationClicked.bind(this);
    this._onClickBackToNotifications = this._onClickBackToNotifications.bind(this);
    this._renderCalloutPopupContent = this._renderCalloutPopupContent.bind(this);
  }

  _onNotificationClicked(ev) {
    const element = ev.currentTarget;
    const { notificationId } = element.dataset;
    this.setState({ viewingNotification: this.props.notifications.get(notificationId) });
  }

  _onClickBackToNotifications() {
    this.setState({ viewingNotification: null });
  }

  _renderCalloutPopupContent() {
    const { notifications } = this.props;
    const { viewingNotification } = this.state;
    return <div>
      <div className={classnames(styles.NotificationsTray_popup_slide, {
        [styles.__active]: ! this.state.viewingNotification,
        [styles.__previous]: !! this.state.viewingNotification,
      })}>
        <div className={styles.NotificationsTray_popup_heading}>
          <h2>Notifications</h2>
        </div>
        {! notifications || ! notifications.size ?
          <div className={styles.NotificationsTray_popup_empty}>
            <h1>Hello!</h1>
            <p>You don't have any notifications yet.</p>
            <aside>New notifications will appear here when <br />
              teachers add internal notes for your students.</aside>
          </div> : null}
        {notifications && notifications.size ?
          <ul className={styles.NotificationsTray_popup_list}>
            {notifications.map((notification, notificationId) => <li>
              <div className={styles.NotificationsTray_notification}
                  onClick={this._onNotificationClicked}
                  data-notification-id={notificationId}
                  role="button"
                  tabIndex="0">
                <span className={styles.NotificationsTray_notification_blurb}>
                  {notification.blurb}
                </span>
                <span className={styles.NotificationsTray_notification_time}>
                  {notification.moment.fromNow()}
                </span>
                <Icon className={styles.NotificationsTray_notification_chevron}
                    id="chevron-small-right" />
              </div>
            </li>)}
          </ul> : null}
      </div>
      <div className={classnames(styles.NotificationsTray_popup_slide, {
        [styles.__active]: !! this.state.viewingNotification,
      })}>
        <div className={classnames(styles.NotificationsTray_popup_heading, styles.__clickable)}
            onClick={this._onClickBackToNotifications}
            role="button"
            tabIndex="0">
          <Icon className={styles.NotificationsTray_popup_heading_chevron}
              id="chevron-small-left" />
          <h2>Back to notifications</h2>
        </div>
        {viewingNotification && viewingNotification.getNotificationViewNode &&
            viewingNotification.getNotificationViewNode()}
      </div>
    </div>;
  }

  render() {
    return <Callout popupClassName={styles.NotificationsTray_popup}
        content={this._renderCalloutPopupContent()}>
      <div className={styles.NotificationsTray}>
        <Icon className={styles.NotificationsTray_icon}
            id="bell" />
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
