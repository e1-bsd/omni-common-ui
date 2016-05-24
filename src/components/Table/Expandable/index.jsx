import styles from './style.postcss';

import React, { Component } from 'react';
import Table from '../Table';
import Reactable from 'reactable';
import ExpandedView from './ExpandedView';

class Expandable extends Component {
  constructor(props) {
    super(props);
    this.state = { expandedRow: undefined };
  }

  render() {
    return <Table className={styles.ExpandTable}>
      <Reactable.Thead>
        {this.props.columns.map((column) => this.renderHeader(column))}
        <Reactable.Th column="expand"><span /></Reactable.Th>
        <Reactable.Th column="expanded" style={{ display: 'none' }}><span /></Reactable.Th>
      </Reactable.Thead>
      {this.props.data.map((row, index) => this.renderRow(row, index))}
    </Table>;
  }

  renderHeader(column) {
    return <Reactable.Th column={column.key} key={column.key}>
      <strong className={column.key}>{column.label}</strong>
    </Reactable.Th>;
  }

  renderRow(row, index) {
    return <Reactable.Tr key={index}>
      {Object.keys(row).map((column) => this.renderCell(row, column))}
      <Reactable.Td column="expand">
        <span onClick={() => this.setState({ expandedRow: index })}>Expand</span>
      </Reactable.Td>
      <Reactable.Td column="expanded" style={{ padding: 0 }}>
        {this.renderExpandedContent(index === this.state.expandedRow)}
      </Reactable.Td>
    </Reactable.Tr>;
  }

  renderCell(row, column) {
    const value = row[column];
    return <Reactable.Td column={column} key={column}>{value}</Reactable.Td>;
  }

  renderExpandedContent(isOpen) {
    return <ExpandedView isOpen={isOpen}
        onRequestClose={() => this.setState({ expandedRow: undefined })} />;
  }
}

Expandable.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
};

export default Expandable;
