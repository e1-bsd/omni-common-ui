import is from 'is_js';
import createApiActionCreator from './';

jest.mock('domain/Api', () => ({
  fetch: (url) => url,
}));
jest.mock('containers/ApiCalls', () => ({
  createAction: (param) => param,
}));

test('is a function', () => {
  expect(is.function(createApiActionCreator)).toBe(true);
});

describe('curry test', () => {
  test('returns a function if given an incomplete set of args', () => {
    expect(is.function(createApiActionCreator('object'))).toBe(true);
  });

  test('returns a function accepting a single dispatch arg if given all args', () => {
    const satisfied = createApiActionCreator('object', 'url', 'method');
    expect(satisfied.length).toBe(1);
  });

  test('returns a function accepting a single dispatch arg if given an object arg', () => {
    const satisfied = createApiActionCreator({});
    expect(satisfied.length).toBe(1);
  });
});

test('makes us some actions', () => {
  const thunk = createApiActionCreator('object', 'url', 'method');
  thunk((fetchRequestAction) => {
    expect(fetchRequestAction).toEqual({
      type: 'FETCH_OBJECT_REQUEST',
      url: 'url',
      method: 'method',
      payload: 'url',
    });
    return {
      payload: {
        then: () => ({
          catch: () => {},
        }),
      },
    };
  });
});
