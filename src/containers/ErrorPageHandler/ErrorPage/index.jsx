import styles from './style.postcss';
import warningSrc from './warning.svg';
import React from 'react';
import Button from 'components/Button';
import is from 'is_js';


const ErrorPage = (props) => {
  const { erroredApi, config, replace, afterButtonClicked } = props;
  return <div className={styles.ErrorPage}>
    <img className={styles.ErrorPage_image} src={warningSrc} role="presentation" />
    <div className={styles.ErrorPage_text}>{renderMessage()}</div>
    <Button type={Button.Type.primary}
        onClick={() => onButtonClick()}>
      {renderButtonText()}
    </Button>
  </div>;

  function renderMessage() {
    if (is.not.object(config) || is.not.function(config.message)) {
      return erroredApi.error.message;
    }

    return config.message(erroredApi, props);
  }

  function onButtonClick() {
    try {
      if (is.not.object(config) || is.not.function(config.onClickButton)) {
        return replace('/');
      }

      return replace(config.onClickButton(erroredApi, props));
    } finally {
      afterButtonClicked();
    }
  }

  function renderButtonText() {
    if (is.not.object(config) || is.not.function(config.buttonText)) {
      return 'Back';
    }

    return config.buttonText(erroredApi, props);
  }
};

ErrorPage.propTypes = {
  replace: React.PropTypes.func.isRequired,
  afterButtonClicked: React.PropTypes.func.isRequired,
  erroredApi: React.PropTypes.shape({
    error: React.PropTypes.instanceOf(Error).isRequired,
  }).isRequired,
  config: React.PropTypes.shape({
    message: React.PropTypes.func,
    buttonText: React.PropTypes.func,
    onClickButton: React.PropTypes.func,
  }),
};

export default ErrorPage;
