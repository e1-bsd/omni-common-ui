import React, { Component } from 'react';
import { Table } from 'omni-common-ui';
import Showcase from 'components/Showcase';

class TableShowcase extends Component {
  render() {
    const data = [
      { name: 'Row one', content: 'These are regular data rows' },
      { name: 'Row two', content: 'They work like above' },
    ];

    return <Showcase title="Tables">
      <Table data={data}/>
    </Showcase>;
  }
}

export default TableShowcase;
