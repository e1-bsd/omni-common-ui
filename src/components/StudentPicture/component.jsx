import styles from './style.postcss';
import defaultAvatarMaleImg from './default-avatar-male.svg';
import defaultAvatarFemaleImg from './default-avatar-female.svg';
import defaultAvatarImg from './default-avatar.svg';

import React, { Component } from 'react';
import is from 'is_js';
import Gender from 'domain/Gender';
import classnames from 'classnames';

class StudentPicture extends Component {
  constructor(props) {
    super(props);

    let { src } = this.props;
    if (is.not.string(src)) {
      src = this.getDefaultAvatar();
    }

    this.state = {
      currentSrc: src,
      originalSrc: src,
    };
  }

  onError() {
    this.setState({ currentSrc: this.getDefaultAvatar() }, this.props.onError);
  }

  getDefaultAvatar() {
    switch (this.props.gender) {
      case Gender.MALE:
        return defaultAvatarMaleImg;
      case Gender.FEMALE:
        return defaultAvatarFemaleImg;
      default:
        return defaultAvatarImg;
    }
  }

  render() {
    const { currentSrc, originalSrc } = this.state;
    // the browser will automatically select the next if the first image fails
    const inlineStyles = {
      backgroundImage: `url("${originalSrc}"), url("${this.getDefaultAvatar()}")`,
    };
    return <div style={inlineStyles}
        className={classnames(styles.StudentPicture, this.props.className)}>
      <img src={currentSrc}
          onError={() => this.onError()}
          alt="user avatar" />
    </div>;
  }
}

StudentPicture.propTypes = {
  gender: React.PropTypes.string,
  src: React.PropTypes.string,
  onError: React.PropTypes.func,
  className: React.PropTypes.string,
};

export default StudentPicture;
