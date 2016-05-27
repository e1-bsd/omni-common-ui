import React from 'react';
import { Table, Grid } from 'omni-common-ui';
import Showcase from 'components/Showcase';

const TableShowcase = () => <Showcase title="Tables" titleLink="tables">
  <Grid>
    <Grid.Group>
      <Grid.Item>
        <Table data={[
          { name: 'Row one', content: 'These are regular data rows' },
          { name: 'Row two', content: 'They work like above' },
          { name: 'Row three', content: 'They work like above' },
        ]} />
      </Grid.Item>
      <Grid.Item>
        <Table.Expandable data={[
          { name: 'Row one', content: 'These are regular data rows' },
          { name: 'Row two', content: 'They work like above' },
          {
            name: 'Row three',
            thirdColumn: 'Not all rows have this',
            content: 'They work like above',
          },
        ]}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'content', label: 'Content' },
              { key: 'thirdColumn', label: 'Third column' },
            ]} />
      </Grid.Item>
    </Grid.Group>
  </Grid>
</Showcase>;

export default TableShowcase;
