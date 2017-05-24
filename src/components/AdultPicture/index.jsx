import defaultAvatarMaleImg from './default-avatar-male.svg';
import defaultAvatarFemaleImg from './default-avatar-female.svg';
import defaultAvatarImg from './default-avatar.svg';

import React from 'react';
import { pure } from 'recompose';
import Avatar from 'components/Avatar';
import PropTypes from 'prop-types';

export const AdultPicture = ({
  src, className, gender, userFirstName, userLastName, displayUserInitialsAsDefaultAvatar,
}) => <Avatar src={src}
    className={className}
    gender={gender}
    userFirstName={userFirstName}
    userLastName={userLastName}
    defaultMale={defaultAvatarMaleImg}
    defaultFemale={defaultAvatarFemaleImg}
    default={defaultAvatarImg}
    displayUserInitialsAsDefaultAvatar={displayUserInitialsAsDefaultAvatar} />;

AdultPicture.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  gender: PropTypes.string,
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
  displayUserInitialsAsDefaultAvatar: PropTypes.bool,
};

export default pure(AdultPicture);
