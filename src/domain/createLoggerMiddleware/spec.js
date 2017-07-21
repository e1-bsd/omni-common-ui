import { createLoggerMiddleware } from './';
import { createLogger } from 'redux-logger';
import log from 'domain/log';

jest.mock('redux-logger', () => ({ createLogger: jest.fn() }));
jest.mock('domain/log', () => ({ debug: jest.fn(), warn: jest.fn() }));

beforeEach(() => {
  jest.resetAllMocks();
});

describe('when PRODUCTION=true', () => {
  let next;

  beforeEach(() => {
    global.PRODUCTION = true;
    next = jest.fn();
  });

  test('does not use redux-logger', () => {
    createLoggerMiddleware();
    expect(createLogger).not.toHaveBeenCalled();
  });

  test('logs every action', () => {
    const action = 'some action';
    createLoggerMiddleware()()(next)(action);
    expect(log.debug).toHaveBeenCalledWith('Dispatched action:', `"${action}"`);
    expect(next).toHaveBeenCalledWith(action);
  });

  test('logs error if an action cannot be logged', () => {
    // This creates a circular object, so that JSON.stringify() crashes
    const action = { obj2: { obj1: undefined } };
    action.obj2.obj1 = action;

    createLoggerMiddleware()()(next)(action);
    expect(log.warn).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });
});

describe('when PRODUCTION=false', () => {
  beforeEach(() => {
    global.PRODUCTION = false;
  });

  test('uses redux-logger directly', () => {
    createLoggerMiddleware();
    expect(createLogger).toHaveBeenCalled();
  });
});
