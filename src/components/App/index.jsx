import React from 'react';
import Header from 'containers/Header';

const App = (props) => {
  if (props.route.checkPrivileges()) {
    // This will block rendering anything in the app until the privileges are loaded.
    return null;
  }

  return <div>
    <Header />
    <div>{props.children}</div>
  </div>;
};

App.propTypes = {
  children: React.PropTypes.node,
  route: React.PropTypes.shape({
    checkPrivileges: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
