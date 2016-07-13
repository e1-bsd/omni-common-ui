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

    this.state = { src };
  }

  onError() {
    this.setState({ src: this.getDefaultAvatar() }, this.props.onError);
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
    return <img src={this.state.src}
        onError={() => this.onError()}
        className={classnames(styles.StudentPicture, this.props.className)}
        role="presentation" />;
  }
}

StudentPicture.propTypes = {
  gender: React.PropTypes.number,
  src: React.PropTypes.string,
  onError: React.PropTypes.func,
  className: React.PropTypes.string,
};

export default StudentPicture;
