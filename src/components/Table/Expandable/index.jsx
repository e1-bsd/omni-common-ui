import styles from './style.postcss';

import React, { Component } from 'react';
import Table from '../Table';
import Reactable from 'reactable';
import ExpandedView from './ExpandedView';

const COLUMN_EXPAND_KEY = 'expand';
const COLUMN_EXPAND_DEF = { key: COLUMN_EXPAND_KEY, label: '' };

class Expandable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { columns } = this.props;
    columns = columns.concat(COLUMN_EXPAND_DEF);

    return <Table className={styles.ExpandTable}
        columns={columns}>
      {this.props.data.map((row, index) => this.renderRow(row, index))}
    </Table>;
  }

  renderRow(row, index) {
    return <Reactable.Tr key={index}>
      {Object.keys(row).map((column) => this.renderCell(row, column))}
      <Reactable.Td column={COLUMN_EXPAND_KEY}>
        <div>
          <span>Expand</span>
          {this.renderExpandedContent(index === 0)}
        </div>
      </Reactable.Td>
    </Reactable.Tr>;
  }

  renderCell(row, column) {
    const value = row[column];
    return <Reactable.Td column={column} key={column}>{value}</Reactable.Td>;
  }

  renderExpandedContent(render) {
    if (render !== true) {
      return;
    }

    return <ExpandedView />;
  }
}

Expandable.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
};

export default Expandable;
