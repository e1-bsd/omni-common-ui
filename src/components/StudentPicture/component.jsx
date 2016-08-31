import styles from './style.postcss';
import defaultAvatarMaleImg from './default-avatar-male.svg';
import defaultAvatarFemaleImg from './default-avatar-female.svg';
import defaultAvatarImg from './default-avatar.svg';

import React, { Component } from 'react';
import Gender from 'domain/Gender';
import classnames from 'classnames';

class StudentPicture extends Component {
  componentWillMount() {
    this.setImageSrcInState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setImageSrcInState(nextProps);
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

  setImageSrcInState(props, cb = () => {}) {
    const { src = this.getDefaultAvatar() } = props;
    if (this.state && this.state.originalSrc === src) {
      return cb();
    }
    this.setState({
      originalSrc: src,
    }, cb);
  }

  render() {
    const { originalSrc } = this.state;
    const inlineStyles = {
      backgroundImage: `url("${originalSrc}"), url("${this.getDefaultAvatar()}")`,
    };
    return <div style={inlineStyles}
        className={classnames(styles.StudentPicture, this.props.className)}
        data-src={originalSrc} />;
  }
}

StudentPicture.propTypes = {
  gender: React.PropTypes.string,
  src: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default StudentPicture;
