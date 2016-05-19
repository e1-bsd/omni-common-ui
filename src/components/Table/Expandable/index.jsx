import React from 'react';
import Table from '../Table';
import Reactable from 'reactable';

const Expandable = (props) => {
  let { columns } = props;
  columns = columns.concat({ key: 'expand', label: '' });

  return <Table columns={columns}>
    {
      props.data.map((row, index) => <Reactable.Tr key={index}>
        {
          Object.keys(row).map((column, index) => {
            const value = row[column];
            return <Reactable.Td column={column} key={index}>{value}</Reactable.Td>;
          })
        }
        <Reactable.Td column="expand">Expand</Reactable.Td>
      </Reactable.Tr>)
    }
  </Table>;
};

Expandable.propTypes = {
  data: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
};

export default Expandable;
