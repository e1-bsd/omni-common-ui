import React from 'react';
import { Profile } from 'omni-common-ui';
import Showcase from 'components/Showcase';

const ProfileShowcase = () => <Showcase title="Profile" titleLink="profile">
  <div>
    <Profile />
  </div>
</Showcase>;

export default ProfileShowcase;
