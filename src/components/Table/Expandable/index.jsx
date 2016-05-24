import styles from './style.postcss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from '../Table';
import Reactable from 'reactable';
import ExpandedView from './ExpandedView';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import { List } from 'immutable';

class Expandable extends Component {
  constructor(props) {
    super(props);
    this.state = { rowHeights: List() };
    this.rows = [];
    this.resizeSensors = [];
  }

  componentDidMount() {
    this.rows.map((row, index) => {
      const node = ReactDOM.findDOMNode(row);
      const resizeSensor = new ResizeSensor(node, () => {
        const { height } = getComputedStyle(node);
        this.setState({ rowHeights: this.state.rowHeights.set(index, height) });
        console.log(height);
      });
      this.resizeSensors.push(resizeSensor);
    });
  }

  componentWillUnmount() {
    this.resizeSensors.forEach((resizeSensor) => resizeSensor.detach());
    this.resizeSensors = null;
    this.rows = null;
  }

  render() {
    return <Table className={styles.ExpandTable}>
      <Reactable.Thead>
        {this.props.columns.map((column) => this.renderHeader(column))}
        <Reactable.Th column="expand"><span /></Reactable.Th>
        <Reactable.Th column="expanded" style={{ display: 'none' }}><span /></Reactable.Th>
        <Reactable.Th column="height" style={{ display: 'none' }}><span /></Reactable.Th>
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
      <Reactable.Td column="expand">Expand</Reactable.Td>
      <Reactable.Td column="expanded" style={{ padding: 0 }}>
        {this.renderExpandedContent(index === 0, this.state.rowHeights.get(index))}
      </Reactable.Td>
      <Reactable.Td column="height" style={{ padding: 0, position: 'relative' }}>
        <div ref={(ref) => this.rows.push(ref)} style={{ height: '100%', position: 'absolute' }}></div>
      </Reactable.Td>
    </Reactable.Tr>;
  }

  renderCell(row, column) {
    const value = row[column];
    return <Reactable.Td column={column} key={column}>{value}</Reactable.Td>;
  }

  renderExpandedContent(render, rowNormalHeight) {
    if (render !== true) {
      return <div></div>;
    }

    return <ExpandedView rowNormalHeight={rowNormalHeight}
        shouldForceHeight={false} />;
  }
}

Expandable.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
};

export default Expandable;
