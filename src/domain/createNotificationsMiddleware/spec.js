import is from 'is_js';
import { createNotificationsMiddleware } from './';

test('is a function', () => {
  expect(is.function(createNotificationsMiddleware)).toBe(true);
});

test('returns a function', () => {
  const config = {
    strategy: 'timer',
    dispatch: {
      requestActionType: 'w',
      successActionType: 'x',
      failureActionType: 'y',
      apiUrl: 'z',
    },
  };
  expect(is.function(createNotificationsMiddleware(config))).toBe(true);
});

test('throws an error when given strategy does not exist', () => {
  expect(() => {
    const config = {
      strategy: '_non_existent_',
      dispatch: {
        requestActionType: 'w',
        successActionType: 'x',
        failureActionType: 'y',
        apiUrl: 'z',
      },
    };
    createNotificationsMiddleware(config);
  }).toThrow();
});
