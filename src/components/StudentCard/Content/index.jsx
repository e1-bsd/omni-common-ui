import React from 'react';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';

const Content = (props) => <div>{props.children}</div>;

Content.propTypes = {
  children: PropTypes.node,
};

export default pure(Content);
