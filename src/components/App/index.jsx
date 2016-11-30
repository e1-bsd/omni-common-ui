import styles from './style.postcss';

import React from 'react';
import Header from 'containers/Header';
import Sidebar from 'containers/Sidebar';

const App = (props) => <div className={styles.App}>
  <Header />
  <div className={styles.App_wrap}>
    <Sidebar {...props} />
    <div className={styles.App_content}>{props.children}</div>
  </div>
</div>;

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
