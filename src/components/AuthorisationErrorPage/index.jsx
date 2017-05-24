import React from 'react';
import ErrorPage from 'components/ErrorPage';
import PropTypes from 'prop-types';

const AuthorisationErrorPage = (props) => {
  const parsedProps = Object.assign({}, props);
  parsedProps.config = Object.assign(
    {
      icon: () => 'lock',
      message: () => 'You have no permission to access this page.',
    },
    props.config);

  return <ErrorPage {...parsedProps} />;
};

AuthorisationErrorPage.propTypes = {
  config: PropTypes.object,
};

export default AuthorisationErrorPage;
