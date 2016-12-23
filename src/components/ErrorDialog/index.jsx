import styles from '../ConfirmDialog/style.postcss';

import React from 'react';
import Dialog from 'components/Dialog';
import Button from 'components/Button';

const ErrorDialog = ({
      onConfirmClick,
      isOpen,
    }) => <Dialog isOpen={isOpen}>
      <div className={styles.ConfirmDialog}>
        <div className={styles.ConfirmDialog_warningIcon} />
        <div className={styles.ConfirmDialog_content}>
          <span>An error occurred!</span>
        </div>
        <div className={styles.ConfirmDialog_buttonWrapper}>
          <Button type={Button.Type.primary}
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
