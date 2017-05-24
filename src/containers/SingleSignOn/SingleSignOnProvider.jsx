import React from 'react';
import { OidcProvider } from 'redux-oidc';
import userManager from './userManager';
import PropTypes from 'prop-types';

const SingleSignOnProvider = (props) => <OidcProvider store={props.store} userManager={userManager}>
  {props.children}
</OidcProvider>;

SingleSignOnProvider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
};

export default SingleSignOnProvider;
