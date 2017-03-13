import defaultAvatarMaleImg from './default-avatar-male.svg';
import defaultAvatarFemaleImg from './default-avatar-female.svg';
import defaultAvatarImg from './default-avatar.svg';

import React from 'react';
import Avatar from 'components/Avatar';

const StudentPicture = ({ src, className, gender }) => <Avatar src={src}
    default={defaultAvatarImg}
    defaultMale={defaultAvatarMaleImg}
    defaultFemale={defaultAvatarFemaleImg}
    className={className}
    gender={gender} />;

StudentPicture.propTypes = {
  gender: React.PropTypes.string,
  src: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default StudentPicture;
