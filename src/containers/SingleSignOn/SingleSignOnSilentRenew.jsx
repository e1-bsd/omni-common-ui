import { Component } from 'react';
import { processSilentRenew } from 'redux-oidc';
import userManager from './userManager'; 
// import { connect } from 'react-redux';

export default class SingleSignOnSilentRenew extends Component {
  componentWillMount() {
    processSilentRenew();
  }

  render() {
    return null;
  }
}