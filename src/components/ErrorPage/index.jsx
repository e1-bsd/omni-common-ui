import styles from './style.postcss';

import React from 'react';
import { pure } from 'recompose';
import is from 'is_js';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';

export const ErrorPage = (props) => {
  const { config } = props;

  return <div className={styles.ErrorPage}>
    <div className={styles.ErrorPage_content}>
      <Icon className={styles.ErrorPage_image} id={renderIcon()} />
      <div className={styles.ErrorPage_text}>{renderMessage()}</div>
    </div>
  </div>;

  function renderIcon() {
    if (is.not.object(config) || is.not.function(config.icon)) {
      return 'warning';
    }

    return config.icon(props);
  }

  function renderMessage() {
    if (is.not.object(config) || is.not.function(config.message)) {
      return 'Omni could not load this page.';
    }

    return config.message(props);
  }
};

ErrorPage.propTypes = {
  replace: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    icon: PropTypes.func,
    message: PropTypes.func,
  }),
};

export default pure(ErrorPage);
