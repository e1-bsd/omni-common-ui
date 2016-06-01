import React from 'react';
import { Student, Grid } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import stupidImage from './2.png';

const StudentShowcase = () => {
  const ruben = {
    name: 'Rubén',
    surname: 'Illodo Brea',
  };

  const gaurav = {
    name: 'Gaurav',
    middleName: 'Awesome',
    surname: 'Pahwa',
  };

  const le = {
    name: 'Le',
    surname: 'Zheng',
  };

  return <Showcase title="Student" titleLink="student">
    <Grid>
      <Grid.Group>
        <Grid.Item className="col-xs-1">
          <Student src="http://7xk9wr.com1.z0.glb.clouddn.com/10.png"
              name={ruben.name}
              surname={ruben.surname} />
        </Grid.Item>
        <Grid.Item className="col-xs-1">
          <Student src={stupidImage} disabled
              name={gaurav.name}
              middleName={gaurav.middleName}
              surname={gaurav.surname} />
        </Grid.Item>
        <Grid.Item className="col-xs-1">
          <Student name={le.name} surname={le.surname} />
        </Grid.Item>
      </Grid.Group>
    </Grid>
  </Showcase>;
};

export default StudentShowcase;
