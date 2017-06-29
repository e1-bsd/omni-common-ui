import styles from './style.postcss';

import React, { PureComponent } from 'react';
import Cursor from 'immutable-cursor';
import Config from 'domain/Config';
import connect from 'domain/connect';
import Icon from 'components/Icon';
import Callout from 'components/Callout';

class NotificationsTray extends PureComponent {
  constructor() {
    super();
    this.state = { open: false };
    this._renderCalloutPopupContent = this._renderCalloutPopupContent.bind(this);
  }

  _renderCalloutPopupContent() {
    const { notifications } = this.props;
    return <div>
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
          {notifications.map((notification) => <li>
            <div className={styles.NotificationsTray_notification}>
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
    </div>;
  }

  render() {
    return <Callout content={this._renderCalloutPopupContent()}
        popupClassName={styles.NotificationsTray_popup}>
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
  }),
};

function mapStateToProps(state) {
  const path = Config.get('notificationsTray').source;
  const notifications = Cursor.from(state, path).deref();
  return { notifications };
}

export default connect(mapStateToProps)(NotificationsTray);
