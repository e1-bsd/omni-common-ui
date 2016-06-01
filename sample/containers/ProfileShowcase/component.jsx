import React from 'react';
import { Profile } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import stupidImage from './2.png';

const ProfileShowcase = () => <Showcase title="Profile" titleLink="profile">
  <div>
    <Profile src="http://7xk9wr.com1.z0.glb.clouddn.com/10.png" />
    <Profile src={stupidImage} disabled />
  </div>
</Showcase>;

export default ProfileShowcase;
