import moment from './';

jest.mock('moment-timezone', () => 'something here');

test('just returns moment-timezone', () => {
  expect(moment).toBe('something here');
});
