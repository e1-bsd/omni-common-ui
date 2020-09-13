import styles from './style.postcss';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { postImpersonate, clearImpersonateData, getTokenEndPoint } from './actions';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import testClass from 'domain/testClass';
import AlertDialog from 'components/AlertDialog';
import ApiCall from 'containers/ApiCalls';
import PropTypes from 'prop-types';

const suffix = '';

class Impersonate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      impersonateEmail: '',
      emailChanged: false,
    };

    this._handleSwitchClick.bind(this);
    this._handleEmailChange.bind(this);
  }

  componentWillUnmount() {
    this.props.clearImpersonateData();
  }

  _handleSwitchClick() {
    this.props.postedImpersonate(this.state.impersonateEmail + suffix, this.props.token);
    this.setState({ emailChanged: false });
  }

  _handleEmailChange(e) {
    this.setState({ impersonateEmail: e.target.value, emailChanged: true });
  }

  _renderErrorPopup() {
    const error = this.props.error;
    if (! error) return;
    const { clean, apiKey } = this.props;
    const cleanError = () => clean(apiKey);

    return <AlertDialog isWarning
        content1={error.response.error}
        okButtonContent="OK"
        onButtonClick={cleanError} />;
  }

  render() {
    const { postImpersonateState } = this.props;
    const errorCode = postImpersonateState ? postImpersonateState.get('error') : undefined;
    const data = postImpersonateState ? postImpersonateState.get('data') : undefined;

    if (data) {
      this.props.success();
    }

    const inputClasses = classnames({ [styles.error]: ! this.state.emailChanged && errorCode },
        testClass('impersonate-dialog-input'));

    return <div className={styles.Impersonate}>
      <p className={styles.Impersonate_title}>Switch User</p>
      <div>
        <TextInput labelName="Email"
            className={styles.Impersonate_field}
            inputClassName={inputClasses}
            onChange={(e) => this._handleEmailChange(e)} />
      </div>
      <Button.Container className={styles.Impersonate_buttonContainer}
          align="center">
        <Button type={Button.Type.primary}
            className={classnames(styles.button, testClass('impersonate-dialog-switch'))}
            disabled={! this.state.impersonateEmail}
            onClick={() => this._handleSwitchClick()}>
          SWITCH
        </Button>
        <Button className={styles.button}
            onClick={() => this.props.close()}>
          CANCEL
        </Button>
      </Button.Container>
      {this._renderErrorPopup()}
    </div>;
  }
}

Impersonate.propTypes = {
  postImpersonateState: PropTypes.object,
  close: PropTypes.func,
  success: PropTypes.func,
  postedImpersonate: PropTypes.func,
  clearImpersonateData: PropTypes.func,
  token: PropTypes.string,
  apiKey: PropTypes.string,
  error: PropTypes.object,
  clean: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const apiKey = `POST ${getTokenEndPoint()}`;
  const error = state.get('apiCalls').get(apiKey) && state.get('apiCalls').get(apiKey).error;
  return {
    postImpersonateState: state.get('impersonate')
      .get('postedImpersonate')
      .get('impersonate'),
    token: state.get('singleSignOn').get('user').get('id_token'),
    error,
    apiKey,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postedImpersonate: (email, token) =>
      dispatch(postImpersonate(email, token)),
    clearImpersonateData: () => dispatch(clearImpersonateData()),
    clean: (key) => dispatch(ApiCall.clean(key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Impersonate);
