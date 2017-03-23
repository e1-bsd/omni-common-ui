import styles from './style.postcss';

import React, { Component } from 'react';
import StudentPicture from 'components/StudentPicture';
import AdultPicture from 'components/AdultPicture';
import log from 'domain/log';
import classnames from 'classnames';

const isPicture = (c) => c.type === StudentPicture || c.type === AdultPicture;

class Person extends Component {
  constructor(props) {
    super(props);
    this._setUp(props);
  }

  componentWillUpdate(props) {
    this._setUp(props);
  }

  _setUp(props) {
    if (! PRODUCTION) {
      this._showWarnings(props);
    }

    const children = React.Children.toArray(props.children);
    this._picture = children.find(isPicture);
    this._lines = children.filter((c) => ! isPicture(c));
  }

  _showWarnings(props) {
    const children = React.Children.toArray(props.children);
    const pictures = children.filter(isPicture);
    const lines = children.filter((c) => ! isPicture(c));

    if (pictures <= 0) {
      log.warn('No picture provided to Person');
    }

    if (pictures > 1) {
      log.warn('More than one picture provided to Person');
    }

    if (lines <= 0) {
      log.warn('No lines provided to Person');
    }
  }

  render() {
    return <div className={classnames(styles.Person, this.props.className)}>
      <div className={styles.Person_picture}>{this._picture}</div>
      <div className={styles.Person_lines}>{this._lines}</div>
    </div>;
  }
}

Person.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default Person;
