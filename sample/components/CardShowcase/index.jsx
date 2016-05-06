import React, { Component } from 'react';
import { Card } from 'omni-common-ui';
import Showcase from 'components/Showcase';

class CardShowcase extends Component {
  render() {
    return <Showcase title="Cards">
      <Card>Normal</Card>
    </Showcase>;
  }
}

export default CardShowcase;
