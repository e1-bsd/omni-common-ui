import Grid from './';
import GridComponent from './Grid';
import GroupComponent from './Group';
import ItemComponent from './Item';

describe('Grid', () => {
  it('can be used directly as Grid component', () => {
    expect(GridComponent).toBe(Grid);
  });

  it('has a Group property', () => {
    expect(GroupComponent).toBe(Grid.Group);
  });

  it('has a Item property', () => {
    expect(ItemComponent).toBe(Grid.Item);
  });
});
