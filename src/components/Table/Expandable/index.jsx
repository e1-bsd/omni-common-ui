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
    const headers = this.props.columns.map((column) => this.renderHeader(column));
    let rows = this.props.data.map((row, index) => this.renderRow(row, index));
    rows = [].concat.apply([], rows);

    return <Table className={styles.ExpandTable}>
      <Reactable.Thead>
        {headers}
        <Reactable.Th column="expand"><span /></Reactable.Th>
        <Reactable.Th column="expanded" style={{ display: 'none' }}><span /></Reactable.Th>
      </Reactable.Thead>
      {rows}
    </Table>;
  }

  renderHeader(column) {
    return <Reactable.Th column={column.key} key={column.key}>
      <strong className={column.key}>{column.label}</strong>
    </Reactable.Th>;
  }

  renderRow(row, index) {
    return [this.renderMasterRow(row, index), this.renderExpandedViewRow(row, index)];
  }

  renderMasterRow(row, index) {
    return <Reactable.Tr key={`${index}-master`}>
      {Object.keys(row).map((column) => this.renderCell(row, column))}
      <Reactable.Td column="expand" className={styles.ExpandTable_expandCell}>
        <div onClick={() => this.setState({ expandedRow: index })}
            className={styles.ExpandTable_expandCell_content}>
          Expand
        </div>
      </Reactable.Td>
      <Reactable.Td column="expanded" className={styles.ExpandTable_expandedCell}><span /></Reactable.Td>
    </Reactable.Tr>;
  }

  renderExpandedViewRow(row, index) {
    return <Reactable.Tr key={`${index}-expanded`}>
      <Reactable.Td column="expanded" className={styles.ExpandTable_expandedCell}>
        <div className={styles.ExpandTable_expandedCell_content}>
          {this.renderExpandedContent(index === this.state.expandedRow)}
        </div>
      </Reactable.Td>
    </Reactable.Tr>;
  }

  renderCell(row, column) {
    const value = row[column];
    return <Reactable.Td column={column} key={column}>{value}</Reactable.Td>;
  }

  renderExpandedContent(isOpen) {
    return <ExpandedView>hey</ExpandedView>;
  }
}

Expandable.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
};

export default Expandable;
