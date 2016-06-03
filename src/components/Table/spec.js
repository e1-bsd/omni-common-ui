import Reactable from 'reactable';
import { expect } from 'chai';
import Table from './';
import TableComponent from './Table';
import ExpandableComponent from './Expandable';

describe('Table', () => {
  it('can be used directly as Table component', () => {
    expect(TableComponent).to.equal(Table);
  });

  it('exposes Sort as property', () => {
    expect(Reactable.Sort).to.equal(Table.Sort);
  });

  it('exposes Td as property', () => {
    expect(Reactable.Td).to.equal(Table.Td);
  });

  it('exposes Tfoot as property', () => {
    expect(Reactable.Tfoot).to.equal(Table.Tfoot);
  });

  it('exposes Thead as property', () => {
    expect(Reactable.Thead).to.equal(Table.Thead);
  });

  it('exposes Tr as property', () => {
    expect(Reactable.Tr).to.equal(Table.Tr);
  });

  it('exposes Th as property', () => {
    expect(Reactable.Th).to.equal(Table.Th);
  });

  it('exposes Expandable as property', () => {
    expect(ExpandableComponent).to.equal(Table.Expandable);
  });
});
