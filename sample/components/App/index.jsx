import React from 'react';

const App = (props) => <div>{props.children}</div>;

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
