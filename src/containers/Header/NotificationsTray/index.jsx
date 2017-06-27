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
    this._getRef = this._getRef.bind(this);
  }

  _getRef(node) {
    this._node = node;
  }

  render() {
    const { notifications } = this.props;
    return <Callout content={
      <div>
        <h1>Notifications</h1>
        <ul>
          {notifications && notifications.map((notification) => <li>
            {notification.studentName} has a new {notification.category} note
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
