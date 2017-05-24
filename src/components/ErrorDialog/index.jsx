import styles from './style.postcss';

import React from 'react';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';

const ErrorDialog = ({ onConfirmClick, isOpen }) => <Dialog withCloseButton
    isOpen={isOpen}
    onRequestClose={(source) => (source === 'button' ? onConfirmClick() : null)}>
  <div className={styles.ErrorDialog}>
    <Icon id="warning" className={styles.ErrorDialog_icon} />
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
  isOpen: PropTypes.bool,
  onConfirmClick: PropTypes.func,
};

export default ErrorDialog;
