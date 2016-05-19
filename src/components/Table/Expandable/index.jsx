import React from 'react';
import Table from '../Table';
import Reactable from 'reactable';

const COLUMN_EXPAND_KEY = 'expand';
const COLUMN_EXPAND_DEF = { key: COLUMN_EXPAND_KEY, label: '' };

const Expandable = (props) => {
  let { columns } = props;
  columns = columns.concat(COLUMN_EXPAND_DEF);

  return <Table columns={columns}>{props.data.map(renderRow)}</Table>;

  function renderRow(row, index) {
    return <Reactable.Tr key={index}>
      {Object.keys(row).map((column) => renderCell(row, column))}
      <Reactable.Td column={COLUMN_EXPAND_KEY}>Expand</Reactable.Td>
    </Reactable.Tr>;
  }

  function renderCell(row, column) {
    const value = row[column];
    return <Reactable.Td column={column} key={column}>{value}</Reactable.Td>;
  }
};

Expandable.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
};

export default Expandable;
