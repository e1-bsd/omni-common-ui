import React from 'react';
import pure from 'recompose/pure';
import { OidcProvider } from './';
import { createUserManager } from 'data/SingleSignOn';
import PropTypes from 'prop-types';

const SingleSignOnProvider = (props) => <OidcProvider store={props.store}
    userManager={createUserManager()}>
  {props.children}
</OidcProvider>;

SingleSignOnProvider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
};

export default pure(SingleSignOnProvider);
