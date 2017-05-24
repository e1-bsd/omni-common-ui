import styles from '../style.postcss';

import React from 'react';
import Button from 'components/Button';
import PropTypes from 'prop-types';

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
  label: PropTypes.string,
  isPrimary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  linkHref: PropTypes.string,
  linkTo: PropTypes.string,
};

export default SaveBarButton;
