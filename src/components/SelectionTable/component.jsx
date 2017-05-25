import styles from './style.postcss';

import React from 'react';
import PureComponent from 'domain/PureComponent';
import is from 'is_js';
import PageCard from 'components/PageCard';
import Icon from 'components/Icon';
import Header from './Header';
import Level from './Level';
import Leaf from './Leaf';
import PropTypes from 'prop-types';

class SelectionTable extends PureComponent {

  constructor(props) {
    super(props);
    this.state = { route: [] };
    this._setUpData(props);
  }

  componentWillUpdate(props) {
    this._setUpData(props);
  }

  _setUpData(props) {
    const children = React.Children.toArray(props.children);
    this._level = children.filter((child) => child.type === Level);
    this._header = children.find((child) => child.type === Header);
  }

  _onLevelClick(route) {
    this.setState({ route });
  }

  _cloneArray(arr) {
    return arr.slice(0);
  }

  _renderContent() {
    let levels = this._cloneArray(this._level);
    const tempRoutes = this._cloneArray(this.state.route);
    while (tempRoutes.length !== 0) {
      const currentRoute = tempRoutes.shift();
      levels = levels.find(
        (level) => level.props.label === currentRoute
      );
      levels = is.array(levels.props.children) ?
        this._cloneArray(levels.props.children) :
        levels.props.children;
    }

    if (tempRoutes.length === 0) {
      return this._renderLevels(levels);
    }
  }

  _renderLevels(levels) {
    if (! is.array(levels) && levels.type === Leaf) {
      return <Leaf>{levels.props.children}</Leaf>;
    }
    return <div>
      {
        levels.map((level) =>
          <Level key={level.props.label}
              route={this.state.route}
              label={level.props.label}
              onClick={(route) => this._onLevelClick(route)}>
            {level.props.children}
          </Level>
        )
      }
    </div>;
  }

  _renderHeading() {
    const { title, rootLinkTitle, hideRootLink, headerClassName } = this.props;
    const routes = this._cloneArray(this.state.route);
    const onHeadingRouteClick = (route) => {
      const routeIndex = routes.indexOf(route);
      if (routeIndex >= 0) {
        const newRoute = routes.slice(0, routeIndex + 1);
        this.setState({ route: newRoute });
      }
    };
    const onHeadingBackClick = () => {
      this.setState({ route: routes.slice(0, routes.length - 1) });
    };

    const onHeadingRootClick = () => {
      this.setState({ route: [] });
    };
    const headingRouteClassName = styles.SelectionTable_heading_route;
    const headingBackClassName = styles.SelectionTable_heading_back;
    if (is.array(routes) && routes.length > 0) {
      return <PageCard.Heading className={styles.SelectionTable_heading}>
        <span className={headingBackClassName} onClick={() => onHeadingBackClick()}>
          <Icon id="arrow-left" />
        </span>
        {
          is.falsy(hideRootLink) ?
            <span className={headingRouteClassName} onClick={() => onHeadingRootClick()}>
              {is.undefined(rootLinkTitle) ? title : rootLinkTitle}
            </span> : null
        }
        {
          routes.map((route) =>
            <span key={route}
                className={headingRouteClassName}
                onClick={() => onHeadingRouteClick(route)}>
              {route}
            </span>)
        }

      </PageCard.Heading>;
    }
    return <PageCard.Heading className={headerClassName} text={this.props.title}>
      {
        is.existy(this._header) ? this._header : null
      }
    </PageCard.Heading>;
  }

  render() {
    return <PageCard>
      {this._renderHeading()}
      <div>
        {this._renderContent()}
      </div>
    </PageCard>;
  }

}

SelectionTable.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  rootLinkTitle: PropTypes.string,
  headerClassName: PropTypes.string,
  hideRootLink: PropTypes.bool,
};

export default SelectionTable;
