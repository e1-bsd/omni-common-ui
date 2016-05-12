import sampleImage from './sample-image.jpg';

import React, { Component } from 'react';
import { Card, Button, Grid } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import log from 'loglevel';

const itemClasses = 'col-xs-6 col-sm-4 col-md-3 col-lg-2';

class CardShowcase extends Component {
  render() {
    return <Showcase title="Cards" titleLink="cards">
      <Grid>
        <Grid.Group>
          <Grid.Item className={itemClasses}>
            <Card>
              <Card.Content>Just some text</Card.Content>
            </Card>
          </Grid.Item>
          <Grid.Item className={itemClasses}>
            <Card><Card.Image src={sampleImage} /></Card>
          </Grid.Item>
          <Grid.Item className={itemClasses}>
            <Card>
              <Card.Image src={sampleImage} />
              <Card.Content>Context after image</Card.Content>
            </Card>
          </Grid.Item>
          <Grid.Item className={itemClasses}>
            <Card>
              <Card.Content>Content before image</Card.Content>
              <Card.Image src={sampleImage} />
            </Card>
          </Grid.Item>
          <Grid.Item className={itemClasses}>
            <Card>
              <Card.Image src={sampleImage} />
              <Card.Content>
                <Card>
                  <Card.Content>Inner card</Card.Content>
                </Card>
              </Card.Content>
            </Card>
          </Grid.Item>
          <Grid.Item className={itemClasses}>
            <Card>
              <Card.Image src={sampleImage} />
              <Card.Content>
                <div>Content with other elements</div>
                <Button onClick={() => log.info('Click!')}>A button</Button>
              </Card.Content>
            </Card>
          </Grid.Item>
        </Grid.Group>
      </Grid>
    </Showcase>;
  }
}

export default CardShowcase;
