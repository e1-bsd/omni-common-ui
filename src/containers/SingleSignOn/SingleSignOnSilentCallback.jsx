import { Component } from 'react';
import userManager from './userManager';
import log from 'domain/log';

class SingleSignOnSilentCallback extends Component {
  componentDidMount() {
    log.debug('SingleSignOnSilentCallback - componentDidMount()');
    userManager.signinSilentCallback()
        .then(() => {
          log.debug('SingleSignOnSilentCallback - Success');
        })
        .catch((error) => {
          log.error('SingleSignOnSilentCallback - Could not sign in', error);
        });
  }

  render() {
    return null;
  }
}

export default SingleSignOnSilentCallback;
