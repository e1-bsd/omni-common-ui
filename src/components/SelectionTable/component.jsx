import React, { Component } from 'react';
import PageCard from '../PageCard';

class SelectionTable extends Component {

  constructor(props) {
    super(props);
    this.state = { route: [] };
  }

  render() {
    return <PageCard>
      <PageCard.Heading text="Selection Table" />
      <div>
        {this.props.children}
      </div>
    </PageCard>;
  }

}

SelectionTable.propTypes = {
  children: React.PropTypes.node,
};

export default SelectionTable;
