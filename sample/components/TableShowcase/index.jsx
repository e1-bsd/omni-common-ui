import React, { Component } from 'react';
import { Table } from 'omni-common-ui';
import Showcase from 'components/Showcase';

class TableShowcase extends Component {
  renderHeader() {
    return <Table.Row>
      <Table.Cell header={true}>1</Table.Cell>
      <Table.Cell header={true}>2</Table.Cell>
      <Table.Cell header={true}>3</Table.Cell>
    </Table.Row>;
  }

  render() {
    return <Showcase title="Tables">
      <Table header={() => this.renderHeader()}>
        <Table.Row>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>2</Table.Cell>
          <Table.Cell>3</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>4</Table.Cell>
          <Table.Cell>5</Table.Cell>
          <Table.Cell>6</Table.Cell>
        </Table.Row>
      </Table>
    </Showcase>;
  }
}

export default TableShowcase;
