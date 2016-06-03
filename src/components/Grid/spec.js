import { expect } from 'chai';
import Grid from './';
import GridComponent from './Grid';
import GroupComponent from './Group';
import ItemComponent from './Item';

describe('Grid', () => {
  it('can be used directly as Grid component', () => {
    expect(GridComponent).to.equal(Grid);
  });

  it('has a Group property', () => {
    expect(GroupComponent).to.equal(Grid.Group);
  });

  it('has a Item property', () => {
    expect(ItemComponent).to.equal(Grid.Item);
  });
});
