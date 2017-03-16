import { Component } from 'react';
import userManager from './userManager';

class SingleSignOnPopUpCallback extends Component {
  componentDidMount() {
    userManager.signinPopupCallback();
  }

  render() {
    return null;
  }
}

export default SingleSignOnPopUpCallback;
