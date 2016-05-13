import React from 'react';
import Table from '../Table';
import Reactable from 'reactable';

const Expandable = (props) => {
  return <Table>
    {
      props.data.map((row) => {
        console.log('row', row);
        return <Reactable.Tr>
          {
            Object.keys(row).map(function(column, index) {
              const value = row[column];
              return <Reactable.Td column={column} value={value} key={index} />
            })
          }
        </Reactable.Tr>;
      })
    }
  </Table>;
};

Expandable.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default Expandable;
