import sampleImage from './sample-image.jpg';

import React, { Component } from 'react';
import { Card, Button, Grid } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import log from 'loglevel';

const itemClasses = 'col-xs-6 col-sm-4 col-md-3 col-lg-2';

class CardShowcase extends Component {
  render() {
    return <Showcase title="Cards">
      <Grid>
        <Grid.Group>
          <Grid.Item className={itemClasses}>
            <Card>
              <Card.Content>Normal</Card.Content>
            </Card>
          </Grid.Item>
          <Grid.Item className={itemClasses}>
            <Card><Card.Image src={sampleImage} /></Card>
          </Grid.Item>
          <Grid.Item className={itemClasses}>
            <Card>
              <Card.Image src={sampleImage} />
              <Card.Content>Some text</Card.Content>
            </Card>
          </Grid.Item>
          <Grid.Item className={itemClasses}>
            <Card>
              <Card.Content>Some text</Card.Content>
              <Card.Image src={sampleImage} />
            </Card>
          </Grid.Item>
          <Grid.Item className={itemClasses}>
            <Card>
              <Card.Image src={sampleImage} />
              <Card.Content>
                <Card>
                  <Card.Content>Some text</Card.Content>
                </Card>
              </Card.Content>
            </Card>
          </Grid.Item>
          <Grid.Item className={itemClasses}>
            <Card>
              <Card.Image src={sampleImage} />
              <Card.Content>
                <div>Some text</div>
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
