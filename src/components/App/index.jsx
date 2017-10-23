import styles from './style.postcss';

import React, { PureComponent } from 'react';
import Header from 'containers/Header';
import Sidebar from 'containers/Sidebar';
import Footer from 'components/Footer';
import classnames from 'classnames';
import testClass from 'domain/testClass';
import Breadcrumbs from 'components/Breadcrumbs';
import HistoryLink from 'components/HistoryLink';
import connect from 'domain/connect';
import PerformanceProfiler from 'components/PerformanceProfiler';
import Config from 'domain/Config';
import BreadcrumbsBuilder from 'domain/BreadcrumbsBuilder';
import PropTypes from 'prop-types';
import Zendesk from 'components/Zendesk';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { sidebarExpanded: false };
  }

  componentDidMount() {
    this._setPageTitle(this.props);
  }

  componentWillUpdate(props) {
    this._setPageTitle(props);
  }

  _collapseSidebar(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({ sidebarExpanded: false });
  }

  _expandSidebar(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({ sidebarExpanded: true });
  }

  _onHamburgerClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState(({ sidebarExpanded }) => ({ sidebarExpanded: ! sidebarExpanded }));
  }

  _setPageTitle(props) {
    this._breadcrumbs = BreadcrumbsBuilder.buildWithProps(props);
    const visibleBreadcrumbCount =
        this._breadcrumbs && this._breadcrumbs.filter((bc) => ! bc.hidden).length;
    if (! this._breadcrumbs || visibleBreadcrumbCount <= 0) {
      document.title = Config.get('displayTitle');
    } else {
      document.title = this._breadcrumbs.filter((bc) => ! bc.hidden)
      .reduce((result, item, index) =>
          `${result}${index !== 0 ? ' / ' : ''}${item.label}`, `${Config.get('displayTitle')} - `);
    }
  }

  render() {
    const { user } = this.props;
    if (! user || user.expired) return null;

    return <div className={classnames(styles.App, testClass('app'))}>
      {
        ! PRODUCTION && Config.get('performanceProfiler') === true &&
        <PerformanceProfiler />
      }
      <Header {...this.props} onHamburgerClick={(e) => this._onHamburgerClick(e)} />
      <div className={styles.App_wrap}>
        <Sidebar {...this.props}
            expanded={this.state.sidebarExpanded}
            onExpand={(e) => this._expandSidebar(e)}
            onCollapse={(e) => this._collapseSidebar(e)} />
        <div className={styles.App_content}>
          <div className={styles.App_content_auxiliary}>
            {
              this._breadcrumbs &&
              <Breadcrumbs className={styles.App_content_auxiliary_breadcrumbs}
                  items={this._breadcrumbs}
                  singleLineMode />
            }
            <HistoryLink className={styles.App_content_auxiliary_historyLink} {...this.props} />
          </div>
          <div className={styles.App_content_wrap}>{this.props.children}</div>
        </div>
      </div>
      <Footer />
      {PRODUCTION && <Zendesk />}
    </div>;
  }
}

App.propTypes = {
  user: PropTypes.shape({
    expired: PropTypes.bool,
  }),
  children: PropTypes.node,
};

export function mapStateToProps(state) {
  return { user: state.get('singleSignOn').get('user') };
}

export default connect(mapStateToProps)(App);
