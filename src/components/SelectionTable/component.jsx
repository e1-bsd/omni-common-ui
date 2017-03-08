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
    this.setState({ route });
  }


  _renderContent() {
    let levels = Array.from([...this._level]);
    const tempRoutes = Array.from([...this.state.route]);
    while (tempRoutes.length !== 0) {
      const currentRoute = tempRoutes.shift();
      levels = levels.find(
        (level) => level.props.label === currentRoute
      );
      levels = Array.from([...levels.props.children]);
    }

    if (tempRoutes.length === 0) {
      return <div>
        {
          levels.map((level) => {
            return <Level route={this.state.route}
                label={level.props.label}
                onClick={(route) => this._onLevelClick(route)} />;
          })
        }
      </div>;
    }
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
