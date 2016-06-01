import React from 'react';
import { Student } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import stupidImage from './2.png';

const ProfileShowcase = () => <Showcase title="Profile" titleLink="profile">
  <div>
    <Student src="http://7xk9wr.com1.z0.glb.clouddn.com/10.png" />
    <Student src={stupidImage} disabled />
  </div>
</Showcase>;

export default ProfileShowcase;
