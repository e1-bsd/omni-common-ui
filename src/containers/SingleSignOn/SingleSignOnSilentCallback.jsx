import { Component } from 'react';
import userManager from './userManager';

class SingleSignOnSilentCallback extends Component {
  componentDidMount() {
    userManager.signinSilentCallback();
  }

  render() {
    return null;
  }
}

export default SingleSignOnSilentCallback;
