import React, { Component } from 'react';
import { Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import log from 'loglevel';

class ButtonShowcase extends Component {
  render() {
    return <Showcase title="Buttons">
      <div>
        <Button onClick={() => log.info('Normal button clicked')}>Normal</Button>
        <Button type={Button.Type.primary}
            onClick={() => log.info('Primary button clicked')}>
          Primary
        </Button>
        <Button disabled={true}
            onClick={() => log.info('Disabled button clicked')}>
          Disabled
        </Button>
      </div>
    </Showcase>;
  }
}

export default ButtonShowcase;
