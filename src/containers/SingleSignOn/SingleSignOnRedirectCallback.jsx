import { Component } from 'react';
import userManager from './userManager';

class SingleSignOnRedirectCallback extends Component {
  componentDidMount() {
    userManager.signinRedirectCallback();
  }

  render() {
    return null;
  }
}

export default SingleSignOnRedirectCallback;
