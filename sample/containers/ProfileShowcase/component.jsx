import React from 'react';
import { Profile } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import yeahImage from './1.png';
import stupidImage from './2.png';

const ProfileShowcase = () => <Showcase title="Profile" titleLink="profile">
  <div>
    <Profile src={yeahImage} />
    <Profile src={stupidImage} disabled />
  </div>
</Showcase>;

export default ProfileShowcase;
