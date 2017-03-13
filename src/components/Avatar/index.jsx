import styles from './style.postcss';

import React, { Component } from 'react';
import classnames from 'classnames';
import is from 'is_js';
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

    const images = [];
    images.push(this._getCssValueForUrl(props.src));
    images.push(this._getCssValueForUrl(this._default));
    this._style = { backgroundImage: images.filter((e) => is.string(e)).join(', ') };
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

  _getCssValueForUrl(url) {
    return is.string(url) && is.not.empty(url) && `url("${url}")`;
  }

  render() {
    return <div style={this._style} className={classnames(styles.Avatar, this.props.className)} />;
  }
}

Avatar.propTypes = {
  src: React.PropTypes.string,
  default: React.PropTypes.string,
  defaultMale: React.PropTypes.string,
  defaultFemale: React.PropTypes.string,
  gender: React.PropTypes.oneOf(Object.values(Gender)),
  className: React.PropTypes.string,
};

Avatar.Gender = Gender;

export default Avatar;
