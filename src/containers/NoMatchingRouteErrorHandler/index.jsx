import React from 'react';
import ErrorPage from 'components/ErrorPage';
import connect from 'domain/connect';

export const ErrorPageHandler = (props) => <ErrorPage {...props} />;

ErrorPageHandler.propTypes = { };

export default connect()(ErrorPageHandler);
