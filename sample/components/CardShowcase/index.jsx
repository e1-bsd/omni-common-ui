import 'flexboxgrid';
import styles from './style.postcss';
import sampleImage from './sample-image.jpg';

import React, { Component } from 'react';
import { Card, Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';

const Item = (props) =>
  <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
    <div className={styles.Item}>{props.children}</div>
  </div>;

class CardShowcase extends Component {
  render() {
    return <Showcase title="Cards">
      <div className="row">
        <Item>
          <Card.Card>
            <Card.Content>Normal</Card.Content>
          </Card.Card>
        </Item>
        <Item>
          <Card.Card><Card.Image src={sampleImage} /></Card.Card>
        </Item>
        <Item>
          <Card.Card>
            <Card.Image src={sampleImage} />
            <Card.Content>Some text</Card.Content>
          </Card.Card>
        </Item>
        <Item>
          <Card.Card>
            <Card.Content>Some text</Card.Content>
            <Card.Image src={sampleImage} />
          </Card.Card>
        </Item>
        <Item>
          <Card.Card>
            <Card.Image src={sampleImage} />
            <Card.Content>
              <Card.Card>
                <Card.Content>Some text</Card.Content>
              </Card.Card>
            </Card.Content>
          </Card.Card>
        </Item>
        <Item>
          <Card.Card>
            <Card.Image src={sampleImage} />
            <Card.Content>
              <div>Some text</div>
              <Button>A button</Button>
            </Card.Content>
          </Card.Card>
        </Item>
      </div>
    </Showcase>;
  }
}

export default CardShowcase;
