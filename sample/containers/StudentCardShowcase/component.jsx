import React from 'react';
import { PersonCard, Card, Grid, Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import testImage from './test-image.png';

const PersonCardShowcase = () => <Showcase title="Student Cards" titleLink="student-cards">
  <Grid>
    <Grid.Group>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard>
          <PersonCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="male"
              statusInitial="s"
              avatarUrl="error" />
        </PersonCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard statusAccentColor="grey">
          <PersonCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              status="studying"
              statusInitial="s"
              statusHighlighted
              avatarUrl="error" />
        </PersonCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard statusAccentColor="green" statusAccentPosition="left">
          <PersonCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              status="On Hold"
              statusInitial="H"
              avatarUrl={testImage} />
        </PersonCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard statusAccentColor="red">
          <PersonCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              avatarUrl={testImage} />
        </PersonCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard statusAccentColor="amber" statusAccentPosition="left">
          <PersonCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              status="On Hold"
              avatarUrl={testImage} />
        </PersonCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard statusAccentColor="invalid">
          <PersonCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              avatarUrl={testImage} />
        </PersonCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard withSeparatorLine>
          <PersonCard.Profile name="Jane"
              surname="Bloggs"
              localName="王呆呆"
              gender="female"
              status="On Hold"
              avatarUrl={testImage} />
          <PersonCard.Content>
            <Card.Content>Some Status</Card.Content>
          </PersonCard.Content>
        </PersonCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard withLeftPaddedContentArea statusAccentColor="grey" withSeparatorLine>
          <PersonCard.Profile name="吴君亮"
              gender="female"
              avatarUrl={testImage} />
          <PersonCard.Content>
            <div>Content div with other things</div>
            <Button>A button</Button>
          </PersonCard.Content>
        </PersonCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard borderless statusAccentColor="grey">
          <PersonCard.Profile name="Jane"
              surname="Borderless"
              localName="王呆呆"
              gender="male"
              avatarUrl={testImage} />
        </PersonCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard backgroundless statusAccentColor="grey">
          <PersonCard.Profile name="Jane"
              surname="Backgroundless"
              localName="王呆呆"
              gender="male"
              avatarUrl={testImage} />
        </PersonCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard backgroundless borderless>
          <PersonCard.Profile name="Jane"
              surname="Barebones"
              localName="王呆呆"
              gender="male"
              avatarUrl={testImage} />
        </PersonCard>
      </Grid.Item>
      <Grid.Item xs={12} sm={6} md={4} lg={3}>
        <PersonCard borderless>
          <PersonCard.Profile name="Jane"
              surname="Bigger Avatar"
              localName="王呆呆"
              gender="male"
              avatarUrl={testImage}
              withBiggerAvatar />
        </PersonCard>
      </Grid.Item>
    </Grid.Group>
  </Grid>
</Showcase>;

export default PersonCardShowcase;
