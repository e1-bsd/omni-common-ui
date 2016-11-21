import styles from './style.postcss';
import warningSrc from './warning.svg';
import React from 'react';
import Button from 'components/Button';

const ErrorPage = (props) => <div className={styles.ErrorPage}>
  <img className={styles.ErrorPage_image} src={warningSrc} role="presentation" />
  <div className={styles.ErrorPage_text}>{props.error.message}</div>
  <Button type={Button.Type.primary}>Back to Dashboard</Button>
</div>;

ErrorPage.propTypes = {
  error: React.PropTypes.instanceOf(Error).isRequired,
};

export default ErrorPage;
