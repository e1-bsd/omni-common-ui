import React from 'react';
import { SingleSignOnHandler } from 'containers/SingleSignOn';
import Header from 'containers/Header';

const App = (props) => <SingleSignOnHandler>
  <div>
    <Header />
    <div>{props.children}</div>
  </div>
</SingleSignOnHandler>;

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
