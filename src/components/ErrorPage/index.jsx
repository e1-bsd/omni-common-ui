import styles from './style.postcss';
import React from 'react';
import Button from 'components/Button';
import is from 'is_js';
import Icon from 'components/Icon';

const ErrorPage = (props) => {
  const { config, afterButtonClicked } = props;

  return <div className={styles.ErrorPage}>
    <div className={styles.ErrorPage_content}>
      <Icon className={styles.ErrorPage_image} id={renderIcon()} />
      <div className={styles.ErrorPage_text}>{renderMessage()}</div>
      <div className={styles.ErrorPage_button}>
        <Button type={Button.Type.primary}
            onClick={() => afterButtonClicked()}
            linkTo={linkTo()}>
          {renderButtonText()}
        </Button>
      </div>
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

  function linkTo() {
    if (is.not.object(config) || is.not.function(config.buttonLink)) {
      return '/';
    }

    return config.buttonLink(props);
  }

  function renderButtonText() {
    if (is.not.object(config) || is.not.function(config.buttonText)) {
      return 'Back';
    }

    return config.buttonText(props);
  }
};

ErrorPage.propTypes = {
  replace: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
  afterButtonClicked: React.PropTypes.func.isRequired,
  config: React.PropTypes.shape({
    icon: React.PropTypes.func,
    message: React.PropTypes.func,
    buttonText: React.PropTypes.func,
    buttonLink: React.PropTypes.func,
  }),
};

export default ErrorPage;
