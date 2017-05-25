import styles from './style.postcss';

import React from 'react';
import PureComponent from 'domain/PureComponent';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';

class Level extends PureComponent {

  _onLevelClick() {
    const { onClick, route, label } = this.props;
    const newRoute = Array.from([...route, label]);
    onClick(newRoute);
  }

  render() {
    const { label } = this.props;
    return <div className={styles.Level} onClick={() => this._onLevelClick()}>
      <span className={styles.Level_label}>
        {label}
      </span>
      <span className={styles.Level_icon}>
        <Icon id="chevron-thin-right" />
      </span>
    </div>;
  }
}

Level.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  route: PropTypes.array,
  currentRoute: PropTypes.array,
};

export default Level;
