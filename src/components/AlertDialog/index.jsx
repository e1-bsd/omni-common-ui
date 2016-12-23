import styles from './style.postcss';
import React from 'react';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import classnames from 'classnames';

const AlertDialog = ({
  isWarning,
  content1,
  content2,
  okButtonContent,
  onButtonClick,
}) => {
  const iconClassName = isWarning ?
      styles.AlertDialog_warningIcon :
      styles.AlertDialog_icon;
  const primaryContentClassName = content1 && content1.length === 0 ?
      '' :
      styles.AlertDialog_content;
  const secondContentClassName = content2 && content2.length === 0 ?
      '' :
      styles.AlertDialog_content;
  return (
    <Dialog isOpen>
      <div className={styles.AlertDialog}>
        <div className={iconClassName} />
        <div className={primaryContentClassName}>
          <span>{content1}</span>
        </div>
        <div className={classnames(secondContentClassName,
          styles.AlertDialog_secondContent)}>
          <span>{content2}</span>
        </div>
        <div className={styles.AlertDialog_buttonWrapper}>
          <Button className={styles.AlertDialog_button}
              type={Button.Type.primary}
              onClick={() => { onButtonClick(); }} >
            {okButtonContent}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  isWarning: React.PropTypes.bool,
  content1: React.PropTypes.string,
  content2: React.PropTypes.string,
  okButtonContent: React.PropTypes.string,
  onButtonClick: React.PropTypes.func,
};

export default AlertDialog;
