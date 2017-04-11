import React from 'react';
import ErrorPage from 'components/ErrorPage';

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
  config: React.PropTypes.object,
};

export default AuthorisationErrorPage;
