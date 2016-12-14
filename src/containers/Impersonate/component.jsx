import styles from './style.postcss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { postImpersonate, clearImpersonateData } from './actions';
import TextInput from 'components/TextInput';
import Button from 'components/Button';

const suffix = '@ef.com';

class Impersonate extends Component {
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
    this.props.postedImpersonate(this.state.impersonateEmail + suffix);
    this.setState({ emailChanged: false });
  }

  _handleEmailChange(e) {
    this.setState({ impersonateEmail: e.target.value, emailChanged: true });
  }

  _getErrorMessage(erroCode) {
    const errorMappings = [
      {
        code: 'E1101',
        message: 'Please enter a valid email address.',
      },
      {
        code: 'E1102',
        message: 'This email doesn\'t exist.',
      },
      {
        code: 'E1103',
        message: 'This email is inactive.',
      },
      {
        code: 'E1104',
        message: 'You are not authorised to switch to this account.',
      },
      {
        code: 'E1105',
        message: 'This user account doesn\'t exist.',
      },
      {
        code: 'E1106',
        message: 'This user account has been suspended.',
      },
      {
        code: 'E1107',
        message: 'This user account has been deactivated.',
      },
    ];

    const error = errorMappings.find((item) => item.code === erroCode);

    return error ? error.message : 'undefined';
  }

  render() {
    const { postImpersonateState } = this.props;
    const errorCode = postImpersonateState ? postImpersonateState.get('error') : undefined;
    const data = postImpersonateState ? postImpersonateState.get('data') : undefined;

    if (data) {
      this.props.success(data);
    }

    return <div className={styles.Impersonate}>
      <p className={styles.Impersonate_title}>Switch User</p>
      <div>
        <TextInput labelName="Email"
            className={styles.Impersonate_field}
            inputClassName={! this.state.emailChanged && errorCode ? styles.error : ''}
            suffix={suffix}
            onChange={(e) => this._handleEmailChange(e)} />
      </div>
      <div className={styles.Impersonate_buttonContainer}>
        <Button type={Button.Type.primary}
            className={styles.button}
            disabled={! this.state.impersonateEmail}
            onClick={() => this._handleSwitchClick()}>
          SWITCH
        </Button>
        <Button className={classnames(styles.button, styles.__default)}
            onClick={() => this.props.close()}>
          CANCEL
        </Button>
      </div>
    </div>;
  }
}

Impersonate.propTypes = {
  postImpersonateState: React.PropTypes.object,
  close: React.PropTypes.func,
  success: React.PropTypes.func,
  postedImpersonate: React.PropTypes.func,
  clearImpersonateData: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    postImpersonateState: state.get('impersonate')
      .get('postedImpersonate')
      .get('impersonate'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postedImpersonate: (email) => dispatch(postImpersonate(email)),
    clearImpersonateData: () => dispatch(clearImpersonateData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Impersonate);
