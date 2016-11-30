import React from 'react';
import ErrorPage from 'components/ErrorPage';
import lockSrc from './lock.svg';

const AuthorisationErrorPage = (props) => {
  const config = {
    icon: () => lockSrc,
    message: () => 'You have no permission to access this page',
  };

  return <ErrorPage config={config} {...props} />;
};

AuthorisationErrorPage.propTypes = { };

export default AuthorisationErrorPage;
