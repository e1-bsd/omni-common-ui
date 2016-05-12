import React from 'react';
import { Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import log from 'loglevel';

const ButtonShowcase = () =>
    <Showcase title="Buttons" titleLink="buttons">
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

export default ButtonShowcase;
