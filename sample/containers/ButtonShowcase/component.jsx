import React from 'react';
import { Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import log from 'loglevel';

const ButtonShowcase = () => <Showcase title="Buttons" titleLink="buttons">
  <div>
    <Button onClick={() => log.info('Normal button clicked')}>
      Normal
    </Button>
    <Button active
        onClick={() => log.info('Active button clicked')}>
      Active
    </Button>
    <Button active disabled
        onClick={() => log.info('Active button clicked')}>
      Disabled active
    </Button>
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
    <Button active
        type={Button.Type.primary}
        onClick={() => log.info('Active primary button clicked')}>
      Active primary
    </Button>
    <Button active disabled
        type={Button.Type.primary}
        onClick={() => log.info('Active primary button clicked')}>
      Disabled active primary
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
    <Button linkTo="/"
        onClick={() => log.info('Link to home clicked')}>
      Link to home
    </Button>
  </div>
  <div>
    <Button onClick={() => log.info('Block button clicked')}
        block>
      Block button
    </Button>
  </div>
  <div>
    <Button block type={Button.Type.primary}
        onClick={() => log.info('Primary block button clicked')}>
      Primary block button
    </Button>
  </div>
  <div>
    <Button active block
        onClick={() => log.info('Active block button clicked')}>
      Active block button
    </Button>
  </div>
  <div>
    <Button disabled block
        onClick={() => log.info('Disabled block button clicked')}>
      Disabled block button
    </Button>
  </div>
  <div>
    <Button autoWidth
        onClick={() => log.info('Auto width button clicked')}>
      Auto width button
    </Button>
    <Button autoWidth type={Button.Type.primary}
        onClick={() => log.info('Primary auto width button clicked')}>
      Primary auto width button
    </Button>
    <Button active autoWidth
        onClick={() => log.info('Active auto width button clicked')}>
      Active auto width button
    </Button>
    <Button disabled autoWidth
        onClick={() => log.info('Disabled auto width button clicked')}>
      Disabled auto width button
    </Button>
  </div>
</Showcase>;

export default ButtonShowcase;
