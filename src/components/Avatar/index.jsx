import styles from './style.postcss';

import React, { PureComponent } from 'react';
import classnames from 'classnames';
import is from 'is_js';
import Gender from 'domain/Gender';

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
    return <div style={this._style} className={classnames(styles.Avatar, this.props.className)} />;
  }
}

Avatar.propTypes = {
  className: React.PropTypes.string,
  src: React.PropTypes.string,
  default: React.PropTypes.string,
  defaultMale: React.PropTypes.string,
  defaultFemale: React.PropTypes.string,
  gender: React.PropTypes.string,
  userFirstName: React.PropTypes.string,
  userLastName: React.PropTypes.string,
  displayUserInitialsAsDefaultAvatar: React.PropTypes.bool,
};

export default Avatar;
