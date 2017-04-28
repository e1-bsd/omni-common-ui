import styles from './style.postcss';

import React from 'react';
import { StudentCard, Card, Grid, Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import testImage from './test-image.png';

const StudentCardShowcase = () => <Showcase title="Student Cards" titleLink="student-cards">
  <Grid>
    <Grid.Group>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard>
          <StudentCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="male"
              statusInitial="s"
              avatarUrl="error" />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard statusAccentColor="grey">
          <StudentCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              status="studying"
              statusInitial="s"
              statusHighlighted
              avatarUrl="error" />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard statusAccentColor="green" statusAccentPosition="left">
          <StudentCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              status="On Hold"
              statusInitial="H"
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard statusAccentColor="red">
          <StudentCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard statusAccentColor="amber" statusAccentPosition="left">
          <StudentCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              status="On Hold"
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard statusAccentColor="invalid">
          <StudentCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard withSeparatorLine>
          <StudentCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              status="On Hold"
              avatarUrl={testImage} />
          <StudentCard.Content>
            <Card.Content>Some Status</Card.Content>
          </StudentCard.Content>
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard withLeftPaddedContentArea statusAccentColor="grey" withSeparatorLine>
          <StudentCard.Profile name="吴君亮"
              gender="female"
              avatarUrl={testImage} />
          <StudentCard.Content>
            <div>Content div with other things</div>
            <Button>A button</Button>
          </StudentCard.Content>
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard borderless statusAccentColor="grey">
          <StudentCard.Profile name="Jane"
              surname="Borderless"
              localName="王呆呆"
              gender="male"
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard backgroundless statusAccentColor="grey">
          <StudentCard.Profile name="Jane"
              surname="Backgroundless"
              localName="王呆呆"
              gender="male"
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard backgroundless borderless>
          <StudentCard.Profile name="Jane"
              surname="Barebones"
              localName="王呆呆"
              gender="male"
              avatarUrl={testImage} />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard borderless>
          <StudentCard.Profile name="Jane"
              surname="Bigger Avatar"
              localName="王呆呆"
              gender="male"
              avatarUrl={testImage}
              withBiggerAvatar />
        </StudentCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <StudentCard vertical className={styles.PersonCardShowCase_vertical}>
          <StudentCard.Profile name="Jane"
              surname="Vertical"
              localName="王呆呆"
              gender="male"
              avatarUrl={testImage}
              withBiggerAvatar />
        </StudentCard>
      </Grid.Item>
    </Grid.Group>
  </Grid>
</Showcase>;

export default StudentCardShowcase;
