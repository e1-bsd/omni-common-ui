import testImage1 from './test-image-1.png';
import testImage2 from './test-image-2.png';

import React from 'react';
import { Student, Grid } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import log from 'loglevel';

const StudentShowcase = () => {
  const ruben = {
    name: 'Rubén',
    surname: 'Illodo Brea',
    src: testImage2,
    onStudentClick: () => log.info('click Ruben'),
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
        <Grid.Item xs={6} md={3}>
          <Student src={ruben.src}
              name={ruben.name}
              surname={ruben.surname}
              onStudentClick={ruben.onStudentClick} />
        </Grid.Item>
        <Grid.Item xs={6} md={3}>
          <Student src={testImage1}
              disabled
              name={gaurav.name}
              middleName={gaurav.middleName}
              surname={gaurav.surname} />
        </Grid.Item>
        <Grid.Item xs={6} md={3}>
          <Student name={le.name} surname={le.surname} />
        </Grid.Item>
      </Grid.Group>
    </Grid>
  </Showcase>;
};

export default StudentShowcase;
