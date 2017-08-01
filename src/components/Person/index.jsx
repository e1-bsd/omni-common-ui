import styles from './style.postcss';

import React, { PureComponent } from 'react';
import StudentPicture from 'components/StudentPicture';
import AdultPicture from 'components/AdultPicture';
import log from 'domain/log';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const isPicture = (c) => c.type === StudentPicture || c.type === AdultPicture;

class Person extends PureComponent {
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
    this._lines = children.filter((c) => ! isPicture(c));

    const picture = children.find(isPicture);
    this._picture = picture ? <picture.type {...picture.props}
        className={classnames(picture.props.className, styles.Person_picture,
        { [styles.Person_picture_vertical]: props.vertical }
        )} /> : null;
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
    const personLinesClassName = this.props.vertical ?
      classnames(styles.Person_lines, styles.Person_lines_vertical) :
      styles.Person_lines;
    return <div className={classnames(styles.Person, this.props.className)}>
      {this._picture}
      <div className={personLinesClassName}>{this._lines}</div>
    </div>;
  }
}

Person.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  vertical: PropTypes.bool,
};

export default Person;
