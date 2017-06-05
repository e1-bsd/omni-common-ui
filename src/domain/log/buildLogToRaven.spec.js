import buildLogToRaven from './buildLogToRaven';
import * as RavenPkg from 'raven-js';
import sprintfPkg from 'sprintf-js';

beforeEach(() => {
  RavenPkg.default.captureBreadcrumb = jest.fn();
  RavenPkg.default.captureException = jest.fn();
  RavenPkg.default.captureMessage = jest.fn();
  sprintfPkg.sprintf = jest.fn();
});

describe('when level is "error"', () => {
  const log = buildLogToRaven('error');

  describe('when not passed an error', () => {
    test('calls Raven.captureMessage()', () => {
      log();
      expect(RavenPkg.default.captureMessage.mock.calls.length).toBe(1);
    });

    test('sets level as "error"', () => {
      log();
      expect(RavenPkg.default.captureMessage.mock.calls[0][1]).toEqual({ level: 'error' });
    });
  });

  describe('when passed an error', () => {
    let error;

    beforeEach(() => {
      error = new Error();
      log(error);
    });

    test('calls Raven.captureException()', () => {
      expect(RavenPkg.default.captureException.mock.calls.length).toBe(1);
    });

    test('sets level as "error"', () => {
      expect(RavenPkg.default.captureException.mock.calls[0][1]).toEqual({ level: 'error' });
    });

    test('ignores all arguments except the first one', () => {
      expect(RavenPkg.default.captureException.mock.calls[0]).toEqual([error, { level: 'error' }]);
    });
  });
});

describe('when level is "warn"', () => {
  const log = buildLogToRaven('warn');

  test('calls Raven.captureBreadcrumb()', () => {
    log();
    expect(RavenPkg.default.captureBreadcrumb.mock.calls.length).toBe(1);
  });

  test('sets level as "warn"', () => {
    log();
    expect(RavenPkg.default.captureBreadcrumb.mock.calls[0][0]).toEqual({ message: '', level: 'warn' });
  });

  describe('when not using C-style format strings', () => {
    test('does not call sprintf', () => {
      log('some normal string');
      expect(sprintfPkg.sprintf.mock.calls.length).toBe(0);
    });

    test('concatenates all provided parameters', () => {
      log('1', 2, '3');
      expect(RavenPkg.default.captureBreadcrumb.mock.calls[0][0].message).toBe('1 2 3');
    });

    test('uses the whole stack of Errors', () => {
      const error = new Error();
      log('1', error, '3');
      expect(RavenPkg.default.captureBreadcrumb.mock.calls[0][0].message).toBe(`1 ${error.stack} 3`);
    });
  });

  describe('when using C-style format strings', () => {
    test('calls sprintf', () => {
      log('some formatted %s string');
      expect(sprintfPkg.sprintf.mock.calls.length).toBe(1);
    });

    test('uses the whole stack of Errors', () => {
      const error = new Error();
      log('1 %s 3', error);
      expect(sprintfPkg.sprintf.mock.calls[0]).toEqual(['1 %s 3', error.stack]);
    });
  });
});

describe('when level is not "error" or "warn"', () => {
  const log = buildLogToRaven('whatever');

  test('calls Raven.captureBreadcrumb()', () => {
    log();
    expect(RavenPkg.default.captureBreadcrumb.mock.calls.length).toBe(1);
  });

  test('sets level as "info"', () => {
    log();
    expect(RavenPkg.default.captureBreadcrumb.mock.calls[0][0]).toEqual({ message: '', level: 'info' });
  });
});
