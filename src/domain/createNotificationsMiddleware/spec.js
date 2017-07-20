import is from 'is_js';
import { fromJS } from 'immutable';
import { createNotificationsMiddleware } from './';
import TimerStrategy from './timer';

jest.mock('domain/createApiActionCreator');
jest.mock('domain/Config', () => {
  const config = require('domain/Config/__mocks__');
  return config.set('apiBase', '/api/');
});
jest.mock('./timer', () => {
  const EventEmitter = require('event-emitter');
  let instance;
  return () => instance || (instance = new EventEmitter());
});

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

test('throws an error when a required config param failed validation', () => {
  expect(() => {
    const config = {
      strategy: 'timer',
      intervalMs: null,
      dispatch: {},
    };
    createNotificationsMiddleware(config);
  }).toThrow();
});

describe('action dispatch', () => {
  test('dispatches action on start when enabled', (done) => {
    const dispatch = {
      apiUrl: 'path',
      method: 'METHOD',
    };
    const config = {
      strategy: 'timer',
      intervalMs: 10000,
      dispatch,
    };
    const middleware = createNotificationsMiddleware(config);
    middleware({
      getState: () => fromJS({
        singleSignOn: {
          user: {
            access_token: 'access_token',
          },
        },
      }),
      dispatch: (arg) => {
        expect(arg).toEqual({
          actionObjectName: 'NOTIFICATIONS',
          url: '/api/path',
          method: 'METHOD',
          requestExtras: {},
          successExtras: {},
          failureExtras: {},
        });
        done();
      },
    })(() => {})();
    const mockTimer = new TimerStrategy();
    mockTimer.emit('notification');
  });

  test('dispatches action on start (disableDefault: true)', (done) => {
    const dispatch = {
      apiUrl: 'path',
      method: 'METHOD',
      disableDefault: true,
    };
    const config = {
      strategy: 'timer',
      intervalMs: 10000,
      dispatch,
    };
    const middleware = createNotificationsMiddleware(config);
    middleware({
      getState: () => fromJS({
        singleSignOn: {
          user: {
            access_token: 'access_token',
          },
        },
      }),
      dispatch: (arg) => {
        expect(arg).toEqual({
          actionObjectName: 'NOTIFICATIONS',
          url: '/api/path',
          method: 'METHOD',
          requestExtras: { disableDefault: true },
          successExtras: { disableDefault: true },
          failureExtras: { disableDefault: true },
        });
        done();
      },
    })(() => {})();
    const mockTimer = new TimerStrategy();
    mockTimer.emit('notification');
  });
});
