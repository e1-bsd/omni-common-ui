import styles from '../style.postcss';

import React from 'react';
import Button from 'components/Button';

const SaveBarButton = ({ label, isPrimary, disabled, onClick, linkHref, linkTo }) =>
  <Button autoWidth
      type={isPrimary ? Button.Type.primaryInverse : Button.Type.defaultInverse}
      className={styles.SaveBar_button}
      disabled={disabled}
      onClick={onClick}
      linkHref={linkHref}
      linkTo={linkTo}>
    {label}
  </Button>;

SaveBarButton.propTypes = {
  label: React.PropTypes.string,
  isPrimary: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  linkHref: React.PropTypes.string,
  linkTo: React.PropTypes.string,
};

export default SaveBarButton;
