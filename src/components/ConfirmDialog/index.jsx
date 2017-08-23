import styles from './style.postcss';

import React from 'react';
import is from 'is_js';
import classnames from 'classnames';

import Dialog from 'components/Dialog';
import Button from 'components/Button';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';
import testClass from 'domain/testClass';

const ConfirmDialog = ({
  children,
  title,
  content,
  primaryButtonContent,
  secondaryButtonContent,
  onPrimaryClick,
  onSecondaryClick,
  onRequestClose,
  isOpen,
  isLoading,
  isButtonless,
}) => <Dialog isOpen={isOpen}
    withCloseButton={is.function(onRequestClose)}
    isLoading={isLoading}
    onRequestClose={(source) => (onRequestClose && source === 'button' ? onRequestClose(source) : null)}>
  <div className={styles.ConfirmDialog}>
    {
      title ?
        <div className={styles.ConfirmDialog_title}>{title}</div> :
        <Icon id="info" className={styles.ConfirmDialog_icon} />
    }
    <div className={styles.ConfirmDialog_content}>
      <span>{content}</span>
      {children}
    </div>
    {
      ! isButtonless &&
      <Button.Container className={styles.ConfirmDialog_buttons}
          align="center">
        <Button type={Button.Type.primary}
            className={classnames(styles.ConfirmDialog_button,
            testClass('confirm-dialog-primary'))}
            onClick={() => onPrimaryClick()}
            disabled={!! isLoading}>
          {primaryButtonContent}
        </Button>
        {
          secondaryButtonContent &&
          <Button type={Button.Type.default}
              className={classnames(styles.ConfirmDialog_button,
                testClass('confirm-dialog-secondary'))}
              onClick={() => onSecondaryClick()}
              disabled={!! isLoading}>
            {secondaryButtonContent}
          </Button>
        }
      </Button.Container>
    }
  </div>
</Dialog>;

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  isButtonless: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  content: PropTypes.string,
  primaryButtonContent: PropTypes.string.isRequired,
  secondaryButtonContent: PropTypes.string,
  onPrimaryClick: PropTypes.func,
  onSecondaryClick: PropTypes.func,
  onRequestClose: PropTypes.func,
};

export default ConfirmDialog;
