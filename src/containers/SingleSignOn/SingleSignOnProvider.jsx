import React from 'react';
import { OidcProvider } from 'redux-oidc';
import userManager from './userManager';

const SingleSignOnProvider = (props) => <OidcProvider store={props.store} userManager={userManager}>
  {props.children}
</OidcProvider>;

SingleSignOnProvider.propTypes = {
  children: React.PropTypes.node,
  store: React.PropTypes.object,
};

export default SingleSignOnProvider;
