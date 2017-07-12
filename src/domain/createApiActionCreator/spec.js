import is from 'is_js';
import Api from 'domain/Api';
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

test('creates some actions!', () => {
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

test('calls basic fetch once when a `payload` was not supplied', () => {
  const thunk = createApiActionCreator('object', 'url', 'method');
  const fetch = jest.spyOn(Api, 'fetch')
      .mockImplementation((url) => url);
  fetch.mockClear();
  thunk(() => {
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0]).toEqual(['url']);
    return {
      payload: {
        then: () => ({
          catch: () => {},
        }),
      },
    };
  });
});

test('calls supplied fetch once when a `payload` was supplied', () => {
  const fetch = jest.spyOn(Api, 'fetch')
      .mockImplementation((url) => url);
  fetch.mockClear();
  const thunk = createApiActionCreator('object', 'url', 'method', {
    payload: fetch('url2', { method: 'PUT' }),
  });
  thunk(() => {
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0]).toEqual(['url2', { method: 'PUT' }]);
    return {
      payload: {
        then: () => ({
          catch: () => {},
        }),
      },
    };
  });
});
