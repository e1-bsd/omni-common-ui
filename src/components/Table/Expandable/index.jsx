import React from 'react';
import Table from '../Table';
import Reactable from 'reactable';
import log from 'loglevel';

const Expandable = (props) =>
  <Table>
    {
      props.data.map((row) => {
        log.info('row', row);
        return <Reactable.Tr>
          {
            Object.keys(row).map((column, index) => {
              const value = row[column];
              return <Reactable.Td column={column} value={value} key={index} />;
            }).concat(<Reactable.Td column="expand" value="hey" />)
          }
        </Reactable.Tr>;
      })
    }
  </Table>;

Expandable.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default Expandable;
