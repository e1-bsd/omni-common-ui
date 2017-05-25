import gridBig from './grid-big.postcss';
import gridCompact from './grid-compact.postcss';
import styles from './style.postcss';

import React from 'react';
import PureComponent from 'domain/PureComponent';
import classnames from 'classnames';
import mediaQuery from 'domain/MediaQuery';
import PropTypes from 'prop-types';

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this._queryListener = this._queryListener.bind(this);
    this._query = mediaQuery('(min-width: 640px)');
    this.state = { grid: this._getGrid(this._query) };
  }

  getChildContext() {
    return { grid: this.state.grid };
  }

  componentDidMount() {
    this._query.addListener(this._queryListener);
  }

  componentWillUnmount() {
    this._query.removeListener(this._queryListener);
  }

  _queryListener(mql) {
    const newGrid = this._getGrid(mql);
    if (newGrid !== this.state.grid) {
      this.setState({ grid: newGrid });
    }
  }

  _getGrid(query) {
    return query.matches ? gridBig : gridCompact;
  }

  render() {
    const classes = classnames(this.state.grid['container-fluid'],
        styles.Grid,
        this.props.className,
        { [styles.__outerMargin]: this.props.outerMargin });
    return <div className={classes}>
      {this.props.children}
    </div>;
  }
}

Grid.propTypes = {
  children: PropTypes.node,
  outerMargin: PropTypes.bool,
  className: PropTypes.string,
};

Grid.childContextTypes = {
  grid: PropTypes.object,
};

export default Grid;
