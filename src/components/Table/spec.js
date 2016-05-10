import { expect } from 'chai';
import Table from './';
import TableComponent from './Table';
import RowComponent from './Row';
import CellComponent from './Cell';

describe('Table', () => {
  it('can be used directly as Table component', () => {
    expect(TableComponent).to.equal(Table);
  });

  it('has a Row property', () => {
    expect(RowComponent).to.equal(Table.Row);
  });

  it('has a Cell property', () => {
    expect(CellComponent).to.equal(Table.Cell);
  });

  it('does not expose Header', () => {
    expect(Table.Header).to.be.undefined;
  });

  it('does not expose Body', () => {
    expect(Table.Body).to.be.undefined;
  });
});
