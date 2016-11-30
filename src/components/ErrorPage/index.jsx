import styles from './style.postcss';
import warningSrc from './warning.svg';
import React from 'react';
import Button from 'components/Button';
import is from 'is_js';
import PathComparator from 'domain/PathComparator';

const ErrorPage = (props) => {
  const { config, afterButtonClicked, location: { pathname } } = props;

  return <div className={styles.ErrorPage}>
    <div className={styles.ErrorPage_content}>
      <img className={styles.ErrorPage_image} src={renderIcon()} role="presentation" />
      <div className={styles.ErrorPage_text}>{renderMessage()}</div>
      {renderButton()}
    </div>
  </div>;

  function renderIcon() {
    if (is.not.object(config) || is.not.function(config.icon)) {
      return warningSrc;
    }

    return config.icon(props);
  }

  function renderMessage() {
    if (is.not.object(config) || is.not.function(config.message)) {
      return 'Omni could not load this page.';
    }

    return config.message(props);
  }

  function renderButton() {
    const link = linkTo();
    if (PathComparator.equal(pathname, link)) {
      return null;
    }

    return <div className={styles.ErrorPage_button}>
      <Button type={Button.Type.primary}
          onClick={() => afterButtonClicked()}
          linkTo={link}>
        {renderButtonText()}
      </Button>
    </div>;
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
    message: React.PropTypes.func,
    buttonText: React.PropTypes.func,
    buttonLink: React.PropTypes.func,
  }),
};

export default ErrorPage;
