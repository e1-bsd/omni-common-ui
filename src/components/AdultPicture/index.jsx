import defaultAvatarMaleImg from './default-avatar-male.svg';
import defaultAvatarFemaleImg from './default-avatar-female.svg';
import defaultAvatarImg from './default-avatar.svg';

import React from 'react';
import { pure } from 'recompose';
import Avatar from 'components/Avatar';

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
  className: React.PropTypes.string,
  src: React.PropTypes.string,
  gender: React.PropTypes.string,
  userFirstName: React.PropTypes.string,
  userLastName: React.PropTypes.string,
  displayUserInitialsAsDefaultAvatar: React.PropTypes.bool,
};

export default pure(AdultPicture);
