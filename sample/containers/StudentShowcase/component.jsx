import React from 'react';
import { Student } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import stupidImage from './2.png';

const StudentShowcase = () => {
  const ruben = {
    name: 'Rubén',
    surname: 'Illodo Brea',
  };

  return <Showcase title="Student" titleLink="student">
    <div>
      <Student src="http://7xk9wr.com1.z0.glb.clouddn.com/10.png"
          name={ruben.name}
          surname={ruben.surname} />
      <Student src={stupidImage} disabled />
    </div>
  </Showcase>;
};

export default StudentShowcase;
