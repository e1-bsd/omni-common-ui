import React, { Component } from 'react';
import { Button, Type } from 'omni-common-ui';
import log from 'loglevel';

class ButtonShowcase extends Component {
  render() {
    return <div>
      <div>
        <Button onClick={() => log.info('Normal button clicked')}>Normal</Button>
        <Button type={Type.danger}
            onClick={() => log.info('Danger button clicked')}>
          Danger!
        </Button>
      </div>
      <div>
        <Button inverse={true}
            onClick={() => log.info('Inverse button clicked')}>
          Inverse
        </Button>
        <Button inverse={true}
            type={Type.danger}
            onClick={() => log.info('Danger inverse button clicked')}>
          Danger inverse
        </Button>
      </div>
    </div>;
  }
}

export default ButtonShowcase;
