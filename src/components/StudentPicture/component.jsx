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

  onError() {
    this.setImageSrcInState({ src: this.getDefaultAvatar() }, this.props.onError);
  }

  setImageSrcInState(props, cb) {
    const { src = this.getDefaultAvatar() } = props;
    this.setState({
      currentSrc: src,
    }, cb);
  }

  render() {
    const { currentSrc } = this.state;
    const inlineStyles = {
      backgroundImage: `url("${currentSrc}")`,
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
