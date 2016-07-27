import React from 'react';
import { StudentCard, Card, Grid, Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import testImage from './test-image.png';

const StudentCardShowcase = () => <Showcase title="Student Cards" titleLink="student-cards">
  <Grid>
    <Grid.Group>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard>
          <StudentCard.Profile name="Kate"
              surname="Zakrzewska"
              gender={0}
              statusInitial="s"
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard statusAccentColor="grey">
          <StudentCard.Profile name="Kate"
              surname="Zakrzewska"
              gender={0}
              status="studying"
              statusInitial="s"
              statusHighlighted
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard statusAccentColor="green" statusAccentPosition="left">
          <StudentCard.Profile name="Kate"
              surname="Zakrzewska"
              gender={0}
              status="On Hold"
              statusInitial="H"
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard statusAccentColor="red">
          <StudentCard.Profile name="Kate"
              surname="Zakrzewska"
              gender={0}
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard statusAccentColor="amber" statusAccentPosition="left">
          <StudentCard.Profile name="Kate"
              surname="Zakrzewska"
              gender={0}
              status="On Hold"
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard statusAccentColor="invalid">
          <StudentCard.Profile name="Kate"
              surname="Zakrzewska"
              gender={0}
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard withSeparatorLine>
          <StudentCard.Profile name="Kate"
              surname="Zakrzewska"
              gender={0}
              avatarUrl={testImage} />
          <StudentCard.Content>
            <Card.Content>Some Status</Card.Content>
          </StudentCard.Content>
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard withLeftPaddedContentArea statusAccentColor="grey" withSeparatorLine>
          <StudentCard.Profile name="吴君亮"
              gender={0}
              avatarUrl={testImage} />
          <StudentCard.Content>
            <div>Content div with other things</div>
            <Button>A button</Button>
          </StudentCard.Content>
        </StudentCard>
      </Grid.Item>
    </Grid.Group>
  </Grid>
</Showcase>;

export default StudentCardShowcase;
