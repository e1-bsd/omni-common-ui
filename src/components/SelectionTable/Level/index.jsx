import React, { Component } from 'react';
import Icon from 'components/Icon';
import styles from './style.postcss';

class Level extends Component {

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
  children: React.PropTypes.node,
  label: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  route: React.PropTypes.array,
  currentRoute: React.PropTypes.array,
};

export default Level;
