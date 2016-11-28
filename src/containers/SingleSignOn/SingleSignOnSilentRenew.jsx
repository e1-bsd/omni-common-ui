import { Component } from 'react';
import { processSilentRenew } from 'redux-oidc';

export default class SingleSignOnSilentRenew extends Component {
  componentWillMount() {
    processSilentRenew();
  }

  render() {
    return null;
  }
}
