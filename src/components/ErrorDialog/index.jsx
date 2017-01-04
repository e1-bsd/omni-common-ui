import styles from '../ConfirmDialog/style.postcss';

import React from 'react';
import Dialog from 'components/Dialog';
import Button from 'components/Button';

const ErrorDialog = ({
      onConfirmClick,
      isOpen,
    }) => <Dialog withCloseButton
        isOpen={isOpen}
        onRequestClose={(source) =>
          (source === 'button' ? onConfirmClick() : null)}>
      <div className={styles.ConfirmDialog}>
        <div className={styles.ConfirmDialog_warningIcon} />
        <div className={styles.ConfirmDialog_content}>
          <span>An error occurred!</span>
        </div>
        <div className={styles.ConfirmDialog_buttonWrapper}>
          <Button type={Button.Type.neoPrimary}
              onClick={() => onConfirmClick()}>
            OK
          </Button>
        </div>
      </div>
    </Dialog>;

ErrorDialog.propTypes = {
  isOpen: React.PropTypes.bool,
  onConfirmClick: React.PropTypes.func,
};

export default ErrorDialog;
