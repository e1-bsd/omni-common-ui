import React, { Component } from 'react';
import PageCard from '../PageCard';
import Level from './Level';

class SelectionTable extends Component {

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
  }

  _onLevelClick(route) {
    console.log('dega', 'on level click', route);
    this.setState({ route });
  }


  _renderContent() {
    let levels = Array.from([...this._level]);
    const tempRoutes = Array.from([...this.state.route]);
    console.log('dega', 'render start', this.state.route, this._level, levels);
    while (tempRoutes.length !== 0) {
      const currentRoute = tempRoutes.shift();
      levels = levels.find(
        (level) => level.props.label === currentRoute
      );
      levels = Array.from([...levels.props.children]);
    }

    if (tempRoutes.length === 0) {
      console.log('dega', 'last render', this.state.route, levels);
      return <div>
        {
          levels.map((level) => {
            console.log('dega', 'foreach', level);
            return <Level route={this.state.route}
                label={level.props.label}
                onClick={(route) => this._onLevelClick(route)} />;
          })
        }
      </div>;
    }
    console.log('dega', 'render finish', this.state.route);
  }

  render() {
    return <PageCard>
      <PageCard.Heading text="Selection Table" />
      <div>
        {this._renderContent()}
      </div>
    </PageCard>;
  }

}

SelectionTable.propTypes = {
  children: React.PropTypes.node,
};

export default SelectionTable;
