import styles from './style.postcss';
import React from 'react';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import classnames from 'classnames';
import Icon from 'components/Icon';

const AlertDialog = ({
  isWarning,
  content1,
  content2,
  okButtonContent,
  onButtonClick,
}) => {
  const iconClassName = classnames(styles.AlertDialog_icon, {
    [styles.__success]: ! isWarning,
    [styles.__warning]: isWarning,
  });
  const primaryContentClassName = content1 && content1.length === 0 ?
      '' :
      styles.AlertDialog_content;
  const secondContentClassName = content2 && content2.length === 0 ?
      '' :
      styles.AlertDialog_content;
  return (
    <Dialog isOpen>
      <div className={styles.AlertDialog}>
        <Icon id={isWarning ? 'warning' : 'success'} className={iconClassName} />
        <div className={primaryContentClassName}>
          <span>{content1}</span>
        </div>
        <div className={classnames(secondContentClassName,
          styles.AlertDialog_secondContent)}>
          <span>{content2}</span>
        </div>
        <Button.Container className={styles.AlertDialog_buttonWrapper}
            align="center">
          <Button className={styles.AlertDialog_button}
              type={Button.Type.primary}
              onClick={() => { onButtonClick(); }} >
            {okButtonContent}
          </Button>
        </Button.Container>
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
