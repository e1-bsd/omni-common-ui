import styles from './style.postcss';

import React, { PureComponent } from 'react';
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
    return <Callout content={<p>Innards</p>}>
      <div className={styles.NotificationsTray}>
        <Icon className={styles.NotificationsTray_icon}
            id="bell" />
      </div>
    </Callout>;
  }
}

export default NotificationsTray;
