import styles from './style.postcss';

import React from 'react';
import is from 'is_js';

import Dialog from 'components/Dialog';
import Button from 'components/Button';
import Icon from 'components/Icon';

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
            className={styles.ConfirmDialog_button}
            onClick={() => onPrimaryClick()}>
          {primaryButtonContent}
        </Button>
        {
          secondaryButtonContent &&
          <Button type={Button.Type.default}
              className={styles.ConfirmDialog_button}
              onClick={() => onSecondaryClick()} >
            {secondaryButtonContent}
          </Button>
        }
      </Button.Container>
    }
  </div>
</Dialog>;

ConfirmDialog.propTypes = {
  isOpen: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  isButtonless: React.PropTypes.bool,
  children: React.PropTypes.node,
  title: React.PropTypes.string,
  content: React.PropTypes.string,
  primaryButtonContent: React.PropTypes.string.isRequired,
  secondaryButtonContent: React.PropTypes.string,
  onPrimaryClick: React.PropTypes.func,
  onSecondaryClick: React.PropTypes.func,
  onRequestClose: React.PropTypes.func,
};

export default ConfirmDialog;
