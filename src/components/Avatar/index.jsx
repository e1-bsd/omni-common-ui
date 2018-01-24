import styles from './style.postcss';

import React, { PureComponent } from 'react';
import classnames from 'classnames';
import is from 'is_js';
import Gender from 'domain/Gender';
import PropTypes from 'prop-types';

import generateUserInitialsAvatarSvgUri from './generateUserInitialsAvatarSvg';

class Avatar extends PureComponent {
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
    if (props.displayUserInitialsAsDefaultAvatar) {
      return generateUserInitialsAvatarSvgUri(props.userFirstName, props.userLastName);
    }

    if (Gender.isMale(props.gender)) {
      return props.defaultMale || props.default;
    }

    if (Gender.isFemale(props.gender)) {
      return props.defaultFemale || props.default;
    }

    return props.default;
  }

  _getCssValueForUrl(url) {
    if (is.not.string(url)) {
      return null;
    }

    // don't let http images crash the party
    const secureUrl = url.replace(/^http:/, '');  // //host/path uses current protocol
    return is.not.empty(url) && `url("${secureUrl}")`;
  }

  render() {
    const className = classnames(styles.Avatar, {
      [styles.__animation]: this.props.animitaion,
    }, this.props.className);
    return <div style={this._style} className={className} />;
  }
}

Avatar.propTypes = {
  animitaion: PropTypes.bool,
  className: PropTypes.string,
  src: PropTypes.string,
  default: PropTypes.string,
  defaultMale: PropTypes.string,
  defaultFemale: PropTypes.string,
  gender: PropTypes.string,
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
  displayUserInitialsAsDefaultAvatar: PropTypes.bool,
};

export default Avatar;
