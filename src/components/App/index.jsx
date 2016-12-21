import styles from './style.postcss';

import React from 'react';
import Header from 'containers/Header';
import Sidebar from 'containers/Sidebar';
import Footer from 'components/Footer';
import classnames from 'classnames';
import testClass from 'domain/testClass';
import RouteBreadcrumbs from 'components/RouteBreadcrumbs';
import connect from 'domain/connect';

const App = (props) => <div className={classnames(styles.App, testClass('app'))}>
  <Header />
  <div className={styles.App_wrap}>
    <Sidebar {...props} />
    <div className={styles.App_content}>
      <div className={styles.App_content_breadcrumbs}>
        <RouteBreadcrumbs state={props.state}
            params={props.params}
            routes={props.routes}
            location={props.location}
            buildRoute={props.buildRoute} />
      </div>
      <div className={styles.App_content_wrap}>{props.children}</div>
    </div>
  </div>
  <Footer />
</div>;

App.propTypes = {
  children: React.PropTypes.node,
  ...RouteBreadcrumbs.propTypes,
};

export default connect()(App);
