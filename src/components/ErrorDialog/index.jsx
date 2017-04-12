import styles from './style.postcss';

import React from 'react';
import Dialog from 'components/Dialog';
import Button from 'components/Button';

const ErrorDialog = ({ onConfirmClick, isOpen }) => <Dialog withCloseButton
    isOpen={isOpen}
    onRequestClose={(source) => (source === 'button' ? onConfirmClick() : null)}>
  <div className={styles.ErrorDialog}>
    <div className={styles.ErrorDialog_warningIcon} />
    <div className={styles.ErrorDialog_content}>
      <span>An error occurred!</span>
    </div>
    <Button.Container className={styles.ErrorDialog_buttons}
        align="center">
      <Button type={Button.Type.primary} onClick={() => onConfirmClick()}>OK</Button>
    </Button.Container>
  </div>
</Dialog>;

ErrorDialog.propTypes = {
  isOpen: React.PropTypes.bool,
  onConfirmClick: React.PropTypes.func,
};

export default ErrorDialog;
