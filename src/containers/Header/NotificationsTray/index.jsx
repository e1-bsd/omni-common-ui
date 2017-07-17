import styles from './style.postcss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Cursor from 'immutable-cursor';
import { CSSTransitionGroup } from 'react-transition-group';
import classnames from 'classnames';
import is from 'is_js';
import { fetch, buildUrl } from 'domain/Api';
import Config from 'domain/Config';
import createApiActionCreator from 'domain/createApiActionCreator';
import connect from 'domain/connect';
import Icon from 'components/Icon';
import Callout from 'components/Callout';
import ListView from './ListView';

class NotificationsTray extends PureComponent {
  constructor() {
    super();
    this.state = {
      viewingNotification: null,
    };
    this._onClickBackToNotifications = this._onClickBackToNotifications.bind(this);
    this._onCalloutOpenStateChanged = this._onCalloutOpenStateChanged.bind(this);
    this._renderCalloutPopupContent = this._renderCalloutPopupContent.bind(this);
  }

  _onClickBackToNotifications() {
    this.setState({ viewingNotification: null });
  }

  _onCalloutOpenStateChanged(isOpen) {
    if (! isOpen || ! this.state.viewingNotification) return;
    this.setState({ viewingNotification: null });
  }

  _onViewNotification(notificationId) {
    this.setState({
      viewingNotification: this.props.notifications.get(notificationId),
    });
  }

  _renderCalloutPopupContent() {
    const { notifications } = this.props;
    const { viewingNotification } = this.state;
    const headerBtnClassName = classnames(styles.NotificationsTray_popup_heading_btn, {
      [styles.__inactive]: !! this.state.isMarkingMode,
    });
    return <div>
      <ListView notifications={notifications}
          markNotificationAsRead={this.props.markNotificationAsRead}
          isListMode={! is.existy(this.state.viewingNotification)}
          headerBtnClassName={headerBtnClassName}
          onViewNotification={(notificationId) => this._onViewNotification(notificationId)} />
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
