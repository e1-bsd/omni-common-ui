import React from 'react';

const NormalCell = (props) => <td>{props.children}</td>;
const HeaderCell = (props) => <th>{props.children}</th>;

const Cell = (props) => {
  const CellNode = props.header === true ?
      HeaderCell :
      NormalCell;
  return <CellNode>
    {props.children}
  </CellNode>;
};

Cell.propTypes = {
  header: React.PropTypes.bool,
};

export default Cell;
