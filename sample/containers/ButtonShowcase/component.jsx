import React from 'react';
import { Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import log from 'loglevel';

const ButtonShowcase = () => <Showcase title="Buttons" titleLink="buttons">
  <div>
    <Button onClick={() => log.info('Normal button clicked')}>Normal</Button>
    <Button disabled
        onClick={() => log.info('Disabled button clicked')}>
      Disabled
    </Button>
  </div>
  <div>
    <Button type={Button.Type.primary}
        onClick={() => log.info('Primary button clicked')}>
      Primary
    </Button>
    <Button disabled
        type={Button.Type.primary}
        onClick={() => log.info('Disabled primary button clicked')}>
      Disabled primary
    </Button>
  </div>
  <div>
    <Button type={Button.Type.primary}
        linkTo="buttons"
        onClick={() => log.info('Link to /buttons clicked')}>
      Link to /buttons
    </Button>
    <Button type={Button.Type.primary}
        linkTo="/"
        onClick={() => log.info('Link to home clicked')}>
      Link to home
    </Button>
  </div>
</Showcase>;

export default ButtonShowcase;
