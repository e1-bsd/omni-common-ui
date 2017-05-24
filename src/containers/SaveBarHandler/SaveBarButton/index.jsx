import styles from '../style.postcss';

import React from 'react';
import classnames from 'classnames';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import testClass from 'domain/testClass';

const SaveBarButton = ({ label, isPrimary, disabled, onClick, linkHref, linkTo }) => {
  const className = classnames(styles.SaveBar_button,
    testClass(`toolbar-button-${label.replace(/\s+/g, '-').toLowerCase()}`));
  return <Button autoWidth
      type={isPrimary ? Button.Type.primaryInverse : Button.Type.defaultInverse}
      className={className}
      disabled={disabled}
      onClick={onClick}
      linkHref={linkHref}
      linkTo={linkTo}>
    {label}
  </Button>;
};

SaveBarButton.propTypes = {
  label: PropTypes.string,
  isPrimary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  linkHref: PropTypes.string,
  linkTo: PropTypes.string,
};

export default SaveBarButton;
