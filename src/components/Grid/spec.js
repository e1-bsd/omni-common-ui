import Grid from './';
import GridComponent from './Grid';
import GroupComponent from './Group';
import ItemComponent from './Item';

jest.mock('domain/MediaQuery');

test('can be used directly as Grid component', () => {
  expect(GridComponent).toBe(Grid);
});

test('has a Group property', () => {
  expect(GroupComponent).toBe(Grid.Group);
});

test('has a Item property', () => {
  expect(ItemComponent).toBe(Grid.Item);
});
