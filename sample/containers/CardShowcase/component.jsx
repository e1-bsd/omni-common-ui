import sampleImage from './sample-image.jpg';

import React from 'react';
import { Card, PageCard, Button, Grid } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import log from 'domain/log';

const CardShowcase = () => <Showcase title="Cards" titleLink="cards">
  <PageCard>
    <PageCard.Heading text="Heading" />
    <PageCard.Content>
      <Grid>
        <Grid.Group>
          <Grid.Item xs={6} sm={4} md={3} lg={2}>
            <Card>
              <Card.Content>Just some text</Card.Content>
            </Card>
          </Grid.Item>
          <Grid.Item xs={6} sm={4} md={3} lg={2}>
            <Card><Card.Image src={sampleImage} /></Card>
          </Grid.Item>
          <Grid.Item xs={6} sm={4} md={3} lg={2}>
            <Card>
              <Card.Image src={sampleImage} />
              <Card.Content>Context after image</Card.Content>
            </Card>
          </Grid.Item>
          <Grid.Item xs={6} sm={4} md={3} lg={2}>
            <Card>
              <Card.Content>Content before image</Card.Content>
              <Card.Image src={sampleImage} />
            </Card>
          </Grid.Item>
          <Grid.Item xs={6} sm={4} md={3} lg={2}>
            <Card>
              <Card.Image src={sampleImage} />
              <Card.Content>
                <Card>
                  <Card.Content>Inner card</Card.Content>
                </Card>
              </Card.Content>
            </Card>
          </Grid.Item>
          <Grid.Item xs={6} sm={4} md={3} lg={2}>
            <Card>
              <Card.Image src={sampleImage} />
              <Card.Content>
                <div>Content with other elements</div>
                <Button type={Button.Type.default} onClick={() => log.info('Click!')}>A button</Button>
              </Card.Content>
            </Card>
          </Grid.Item>
        </Grid.Group>
      </Grid>
    </PageCard.Content>
  </PageCard>
</Showcase>;

export default CardShowcase;
