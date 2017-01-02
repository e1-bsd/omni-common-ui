import styles from './style.postcss';

import React from 'react';
import { Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import log from 'loglevel';

const ButtonShowcase = () => <Showcase title="Buttons" titleLink="buttons"
    className={styles.ButtonShowcase_wrap}>
  <div> {/* neoSecondary */}
    <Button type={Button.Type.neoSecondary}
        onClick={() => log.info('Normal button clicked')}>
      Normal
    </Button>
    <Button active
        type={Button.Type.neoSecondary}
        onClick={() => log.info('Active button clicked')}>
      Active
    </Button>
    <Button active disabled
        type={Button.Type.neoSecondary}
        onClick={() => log.info('Active button clicked')}>
      Disabled active
    </Button>
    <Button disabled
        type={Button.Type.neoSecondary}
        onClick={() => log.info('Disabled button clicked')}>
      Disabled
    </Button>
  </div>
  <div> {/* neoPrimary */}
    <Button type={Button.Type.neoPrimary}
        onClick={() => log.info('Primary button clicked')}>
      Primary
    </Button>
    <Button active
        type={Button.Type.neoPrimary}
        onClick={() => log.info('Active primary button clicked')}>
      Active primary
    </Button>
    <Button active disabled
        type={Button.Type.neoPrimary}
        onClick={() => log.info('Active primary button clicked')}>
      Disabled active primary
    </Button>
    <Button disabled
        type={Button.Type.neoPrimary}
        onClick={() => log.info('Disabled primary button clicked')}>
      Disabled primary
    </Button>
  </div>
  <div> {/* neoPrimaryInverse */}
    <Button type={Button.Type.neoPrimaryInverse}
        onClick={() => log.info('Primary button clicked')}>
      Primary inv
    </Button>
    <Button active
        type={Button.Type.neoPrimaryInverse}
        onClick={() => log.info('Active primary button clicked')}>
      Active primary inv
    </Button>
    <Button active disabled
        type={Button.Type.neoPrimaryInverse}
        onClick={() => log.info('Active primary button clicked')}>
      Disabled active primary inv
    </Button>
    <Button disabled
        type={Button.Type.neoPrimaryInverse}
        onClick={() => log.info('Disabled primary button clicked')}>
      Disabled primary inverse inv
    </Button>
  </div>
  <div> {/* neo link buttons */}
    <Button type={Button.Type.neoPrimary}
        linkTo="buttons"
        onClick={() => log.info('Link to /buttons clicked')}>
      Link to /buttons
    </Button>
    <Button type={Button.Type.neoSecondary}
        onClick={() => log.info('Normal button clicked')}>
      Normal button
    </Button>
    <Button type={Button.Type.neoSecondary}
        linkTo="buttons"
        onClick={() => log.info('Link to /buttons clicked')}>
      Link to /buttons
    </Button>
  </div>
  <div> {/* neo block */}
    <Button type={Button.Type.neoSecondary}
        onClick={() => log.info('Block button clicked')}
        block>
      Block button
    </Button>
  </div>
  <div> {/* neoPrimary block */}
    <Button block type={Button.Type.neoPrimary}
        onClick={() => log.info('Primary block button clicked')}>
      Primary block button
    </Button>
  </div>
  <div> {/* neo active block */}
    <Button active block type={Button.Type.neoSecondary}
        onClick={() => log.info('Active block button clicked')}>
      Active block button
    </Button>
  </div>
  <div> {/* neo disabled block */}
    <Button disabled block type={Button.Type.neoSecondary}
        onClick={() => log.info('Disabled block button clicked')}>
      Disabled block button
    </Button>
  </div>

  <div> {/* default */}
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
  <div> {/* primary */}
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
  <div> {/* defaultInverse */}
    <Button type={Button.Type.defaultInverse}
        onClick={() => log.info('DefaultInverse button clicked')}>
      DefaultInverse
    </Button>
    <Button active
        type={Button.Type.defaultInverse}
        onClick={() => log.info('Active defaultInverse button clicked')}>
      Active defaultInverse
    </Button>
    <Button active disabled
        type={Button.Type.defaultInverse}
        onClick={() => log.info('Active defaultInverse button clicked')}>
      Disabled active defaultInverse
    </Button>
    <Button disabled
        type={Button.Type.defaultInverse}
        onClick={() => log.info('Disabled defaultInverse button clicked')}>
      Disabled defaultInverse
    </Button>
  </div>
  <div> {/* primaryInverse */}
    <Button type={Button.Type.primaryInverse}
        onClick={() => log.info('PrimaryInverse button clicked')}>
      PrimaryInverse
    </Button>
    <Button active
        type={Button.Type.primaryInverse}
        onClick={() => log.info('Active primaryInverse button clicked')}>
      Active primaryInverse
    </Button>
    <Button active disabled
        type={Button.Type.primaryInverse}
        onClick={() => log.info('Active primaryInverse button clicked')}>
      Disabled active primaryInverse
    </Button>
    <Button disabled
        type={Button.Type.primaryInverse}
        onClick={() => log.info('Disabled primaryInverse button clicked')}>
      Disabled primaryInverse
    </Button>
  </div>
  <div> {/* default link buttons */}
    <Button linkTo="/"
        onClick={() => log.info('Link to home clicked')}>
      Link to home
    </Button>
    <Button type={Button.Type.primary}
        linkTo="buttons"
        onClick={() => log.info('Link to /buttons clicked')}>
      Link to /buttons
    </Button>
  </div>

  <div> {/* block */}
    <Button onClick={() => log.info('Block button clicked')}
        block>
      Block button
    </Button>
  </div>
  <div> {/* primary block */}
    <Button block type={Button.Type.primary}
        onClick={() => log.info('Primary block button clicked')}>
      Primary block button
    </Button>
  </div>
  <div> {/* active block */}
    <Button active block
        onClick={() => log.info('Active block button clicked')}>
      Active block button
    </Button>
  </div>
  <div> {/* disabled block */}
    <Button disabled block
        onClick={() => log.info('Disabled block button clicked')}>
      Disabled block button
    </Button>
  </div>

  <div> {/* auto width */}
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
