import React, { Component } from 'react';
import { Table, Grid } from 'omni-common-ui';
import Showcase from 'components/Showcase';

class TableShowcase extends Component {
  render() {
    return <Showcase title="Tables">
      <Grid>
        <Grid.Group>
          <Table data={[
            { Name: 'Row one', Content: 'These are regular data rows' },
            { Name: 'Row two', Content: 'They work like above' },
            { Name: 'Row three', Content: 'They work like above' },
          ]} />
          <Table data={[
            { Name: 'Row one', Content: 'These are regular data rows' },
            { Name: 'Row two', Content: 'They work like above' },
            {
              Name: 'Row three',
              'Third column': 'Not all rows have this',
              Content: 'They work like above',
            },
          ]} />
      </Grid.Group>
      </Grid>
    </Showcase>;
  }
}

export default TableShowcase;
