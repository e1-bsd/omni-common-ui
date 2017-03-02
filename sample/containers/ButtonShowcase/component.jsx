import styles from './style.postcss';

import React from 'react';
import { Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import log from 'domain/log';

const ButtonShowcase = () => <Showcase title="Buttons" titleLink="buttons"
    className={styles.ButtonShowcase_wrap}>
  <Button.Container> {/* default */}
    <Button type={Button.Type.default}
        onClick={() => log.info('Normal button clicked')}>
      Normal
    </Button>
    <Button active
        type={Button.Type.default}
        onClick={() => log.info('Active button clicked')}>
      Active
    </Button>
    <Button active disabled
        type={Button.Type.default}
        onClick={() => log.info('Active button clicked')}>
      Disabled active
    </Button>
    <Button disabled
        type={Button.Type.default}
        onClick={() => log.info('Disabled button clicked')}>
      Disabled
    </Button>
  </Button.Container>
  <Button.Container> {/* inverse */}
    <Button type={Button.Type.defaultInverse}
        onClick={() => log.info('Normal button clicked')}>
      Normal inv
    </Button>
    <Button active
        type={Button.Type.defaultInverse}
        onClick={() => log.info('Active button clicked')}>
      Active inv
    </Button>
    <Button active disabled
        type={Button.Type.defaultInverse}
        onClick={() => log.info('Active button clicked')}>
      Disabled active inv
    </Button>
    <Button disabled
        type={Button.Type.defaultInverse}
        onClick={() => log.info('Disabled button clicked')}>
      Disabled inv
    </Button>
  </Button.Container>
  <Button.Container> {/* primary */}
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
  </Button.Container>
  <Button.Container> {/* primaryInverse */}
    <Button type={Button.Type.primaryInverse}
        onClick={() => log.info('Primary button clicked')}>
      Primary inv
    </Button>
    <Button active
        type={Button.Type.primaryInverse}
        onClick={() => log.info('Active primary button clicked')}>
      Active primary inv
    </Button>
    <Button active disabled
        type={Button.Type.primaryInverse}
        onClick={() => log.info('Active primary button clicked')}>
      Disabled active primary inv
    </Button>
    <Button disabled
        type={Button.Type.primaryInverse}
        onClick={() => log.info('Disabled primary button clicked')}>
      Disabled primary inverse inv
    </Button>
  </Button.Container>
  <Button.Container> {/* link buttons */}
    <Button type={Button.Type.primary}
        linkTo="buttons"
        onClick={() => log.info('Link to /buttons clicked')}>
      Link to /buttons
    </Button>
    <Button type={Button.Type.default}
        onClick={() => log.info('Normal button clicked')}>
      Normal button
    </Button>
    <Button type={Button.Type.default}
        linkTo="buttons"
        onClick={() => log.info('Link to /buttons clicked')}>
      Link to /buttons
    </Button>
  </Button.Container>
  <Button.Container> {/* block */}
    <Button type={Button.Type.default}
        onClick={() => log.info('Block button clicked')}
        block>
      Block button
    </Button>
  </Button.Container>
  <Button.Container> {/* primary block */}
    <Button block type={Button.Type.primary}
        onClick={() => log.info('Primary block button clicked')}>
      Primary block button
    </Button>
  </Button.Container>
  <Button.Container> {/* active block */}
    <Button active block type={Button.Type.default}
        onClick={() => log.info('Active block button clicked')}>
      Active block button
    </Button>
  </Button.Container>
  <Button.Container> {/* disabled block */}
    <Button disabled block type={Button.Type.default}
        onClick={() => log.info('Disabled block button clicked')}>
      Disabled block button
    </Button>
  </Button.Container>

  <Button.Container align="left"> {/* align=left */}
    <Button type={Button.Type.default}
        onClick={() => log.info('Normal button clicked')}>
      Contained (align=left)
    </Button>
  </Button.Container>
  <Button.Container align="center"> {/* align=center */}
    <Button type={Button.Type.default}
        onClick={() => log.info('Normal button clicked')}>
      Contained (align=center)
    </Button>
  </Button.Container>
  <Button.Container align="right"> {/* align=right */}
    <Button type={Button.Type.default}
        onClick={() => log.info('Normal button clicked')}>
      Contained (align=right)
    </Button>
  </Button.Container>
</Showcase>;

export default ButtonShowcase;
