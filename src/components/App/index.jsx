import React from 'react';
import Header from 'containers/Header';

const App = (props) => <div>
  <Header />
  <div>{props.children}</div>
</div>;

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
