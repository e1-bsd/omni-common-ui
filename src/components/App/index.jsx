import styles from './style.postcss';

import React from 'react';
import Header from 'containers/Header';
import Sidebar from 'containers/Sidebar';
import Footer from 'components/Footer';
import classnames from 'classnames';
import testClass from 'domain/testClass';
import RouteBreadcrumbs from 'components/RouteBreadcrumbs';
import Histories from 'components/Histories';
import connect from 'domain/connect';
import ApiCall from 'containers/ApiCalls';
import PerformanceProfiler from 'components/PerformanceProfiler';

const App = (props) => <div className={classnames(styles.App, testClass('app'))}>
  {
    ! PRODUCTION &&
    <PerformanceProfiler />
  }
  <Header {...props} />
  <div className={styles.App_wrap}>
    <Sidebar {...props} />
    <div className={styles.App_content}>
      {
        ! props.isThereAnError &&
        <div className={styles.App_content_auxiliary}>
          <RouteBreadcrumbs className={styles.App_content_auxiliary_breadcrumbs}
              params={props.params}
              routes={props.routes}
              location={props.location}
              buildRoute={props.buildRoute} />
          <Histories className={styles.App_content_auxiliary_histories} {...props} />
        </div>
      }
      <div className={styles.App_content_wrap}>{props.children}</div>
    </div>
  </div>
  <Footer />
</div>;

App.propTypes = {
  children: React.PropTypes.node,
  router: React.PropTypes.any.isRequired,
  routes: React.PropTypes.array.isRequired,
  isThereAnError: React.PropTypes.bool.isRequired,
  ...RouteBreadcrumbs.propTypes,
};

export function mapStateToProps(state) {
  return { isThereAnError: ApiCall.getErrors(state).size > 0 };
}

export default connect(mapStateToProps)(App);
