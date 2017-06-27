import styles from './style.postcss';

import React, { PureComponent } from 'react';
import Cursor from 'immutable-cursor';
import Config from 'domain/Config';
import moment from 'domain/moment';
import connect from 'domain/connect';
import Icon from 'components/Icon';
import Callout from 'components/Callout';

class NotificationsTray extends PureComponent {
  constructor() {
    super();
    this.state = { open: false };
    this._getRef = this._getRef.bind(this);
  }

  _getRef(node) {
    this._node = node;
  }

  render() {
    const { notifications } = this.props;
    return <Callout popupClassName={styles.NotificationsTray_popup}
        content={
          <div>
            <div className={styles.NotificationsTray_popup_heading}>
              <h1>Notifications</h1>
            </div>
            <ul className={styles.NotificationsTray_popup_list}>
              {notifications && notifications.map((notification) => <li>
                <div className={styles.NotificationsTray_popup_notification}>
                  <span>
                    {notification.studentName} has a new {notification.category} note
                  </span>
                  <span>
                    {moment(notification.notedDateTimeUtc).fromNow()}
                  </span>
                  <Icon id="chevron-small-right" />
                </div>
              </li>)}
            </ul>
          </div>
        }>
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
  const notifications = Cursor.from(state, path);
  return { notifications };
}

export default connect(mapStateToProps)(NotificationsTray);
