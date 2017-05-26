import defaultAvatarMaleImg from './default-avatar-male.svg';
import defaultAvatarFemaleImg from './default-avatar-female.svg';
import defaultAvatarImg from './default-avatar.svg';

import React from 'react';
import pure from 'recompose/pure';
import Avatar from 'components/Avatar';
import PropTypes from 'prop-types';

export const StudentPicture = ({ src, className, gender }) => <Avatar src={src}
    default={defaultAvatarImg}
    defaultMale={defaultAvatarMaleImg}
    defaultFemale={defaultAvatarFemaleImg}
    className={className}
    gender={gender} />;

StudentPicture.propTypes = {
  gender: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
};

export default pure(StudentPicture);
