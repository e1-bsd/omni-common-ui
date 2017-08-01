'use strict';

var _buildLogToRaven = require('./buildLogToRaven');

var _buildLogToRaven2 = _interopRequireDefault(_buildLogToRaven);

var _ravenJs = require('raven-js');

var RavenPkg = _interopRequireWildcard(_ravenJs);

var _sprintfJs = require('sprintf-js');

var _sprintfJs2 = _interopRequireDefault(_sprintfJs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(function () {
  RavenPkg.default.captureBreadcrumb = jest.fn();
  RavenPkg.default.captureException = jest.fn();
  RavenPkg.default.captureMessage = jest.fn();
  _sprintfJs2.default.sprintf = jest.fn();
});

describe('when level is "error"', function () {
  var log = (0, _buildLogToRaven2.default)('error');

  describe('when not passed an error', function () {
    test('calls Raven.captureMessage()', function () {
      log();
      expect(RavenPkg.default.captureMessage.mock.calls.length).toBe(1);
    });

    test('sets level as "error"', function () {
      log();
      expect(RavenPkg.default.captureMessage.mock.calls[0][1]).toEqual({ level: 'error' });
    });
  });

  describe('when passed an error', function () {
    var error = void 0;

    beforeEach(function () {
      error = new Error();
      log(error);
    });

    test('calls Raven.captureException()', function () {
      expect(RavenPkg.default.captureException.mock.calls.length).toBe(1);
    });

    test('sets level as "error"', function () {
      expect(RavenPkg.default.captureException.mock.calls[0][1]).toEqual({ level: 'error' });
    });

    test('ignores all arguments except the first one', function () {
      expect(RavenPkg.default.captureException.mock.calls[0]).toEqual([error, { level: 'error' }]);
    });
  });
});

describe('when level is "warn"', function () {
  var log = (0, _buildLogToRaven2.default)('warn');

  test('calls Raven.captureBreadcrumb()', function () {
    log();
    expect(RavenPkg.default.captureBreadcrumb.mock.calls.length).toBe(1);
  });

  test('sets level as "warn"', function () {
    log();
    expect(RavenPkg.default.captureBreadcrumb.mock.calls[0][0]).toEqual({ message: '', level: 'warn' });
  });

  describe('when not using C-style format strings', function () {
    test('does not call sprintf', function () {
      log('some normal string');
      expect(_sprintfJs2.default.sprintf.mock.calls.length).toBe(0);
    });

    test('concatenates all provided parameters', function () {
      log('1', 2, '3');
      expect(RavenPkg.default.captureBreadcrumb.mock.calls[0][0].message).toBe('1 2 3');
    });

    test('uses the whole stack of Errors', function () {
      var error = new Error();
      log('1', error, '3');
      expect(RavenPkg.default.captureBreadcrumb.mock.calls[0][0].message).toBe('1 ' + error.stack + ' 3');
    });
  });

  describe('when using C-style format strings', function () {
    test('calls sprintf', function () {
      log('some formatted %s string');
      expect(_sprintfJs2.default.sprintf.mock.calls.length).toBe(1);
    });

    test('uses the whole stack of Errors', function () {
      var error = new Error();
      log('1 %s 3', error);
      expect(_sprintfJs2.default.sprintf.mock.calls[0]).toEqual(['1 %s 3', error.stack]);
    });
  });
});

describe('when level is not "error" or "warn"', function () {
  var log = (0, _buildLogToRaven2.default)('whatever');

  test('calls Raven.captureBreadcrumb()', function () {
    log();
    expect(RavenPkg.default.captureBreadcrumb.mock.calls.length).toBe(1);
  });

  test('sets level as "info"', function () {
    log();
    expect(RavenPkg.default.captureBreadcrumb.mock.calls[0][0]).toEqual({ message: '', level: 'info' });
  });
});
//# sourceMappingURL=buildLogToRaven.spec.js.map
