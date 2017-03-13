import styles from './style.postcss';

import React, { Component } from 'react';
import classnames from 'classnames';
import Gender from 'domain/Gender';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this._setUp(props);
  }

  componentWillUpdate(props) {
    this._setUp(props);
  }

  _setUp(props) {
    this._default = this._getDefaultAvatar(props);
  }

  _getDefaultAvatar(props) {
    switch (props.gender) {
      case Gender.MALE:
        return props.defaultMale || props.default;
      case Gender.FEMALE:
        return props.defaultFemale || props.default;
      default:
        return props.default;
    }
  }

  render() {
    const inlineStyles = { backgroundImage: `url("${this.props.url}"), url("${this._default}")` };
    return <div style={inlineStyles}
        className={classnames(styles.Avatar, this.props.className)}
        data-src={this.props.url} />;
  }
}

Avatar.propTypes = {
  url: React.PropTypes.string,
  default: React.PropTypes.string,
  defaultMale: React.PropTypes.string,
  defaultFemale: React.PropTypes.string,
  gender: React.PropTypes.oneOf(Object.values(Gender)),
  className: React.PropTypes.string,
};


export default Avatar;
