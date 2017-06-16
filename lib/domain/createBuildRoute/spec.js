'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require('./');

test('is a function', function () {
  expect(typeof _.createBuildRoute === 'undefined' ? 'undefined' : _typeof(_.createBuildRoute)).toBe('function');
});

test('returns a function', function () {
  expect(_typeof((0, _.createBuildRoute)())).toBe('function');
});

describe('buildRoute', function () {
  test('joins a simple route', function () {
    var ownProps = { routes: [{ path: 'oldpathname' }] };
    var buildRoute = (0, _.createBuildRoute)(ownProps);
    expect(buildRoute('newroute')).toBe('/oldpathname/newroute');
  });

  test('interprets ../ in the route', function () {
    var ownProps = { routes: [{ path: 'old/path/name' }] };
    var buildRoute = (0, _.createBuildRoute)(ownProps);
    expect(buildRoute('..')).toBe('/old/path');
    expect(buildRoute('../newroute')).toBe('/old/path/newroute');
    expect(buildRoute('../../newroute')).toBe('/old/newroute');
    expect(buildRoute('../useless/../route')).toBe('/old/path/route');
  });

  test('interprets routes starting with /', function () {
    var ownProps = { routes: [{ path: 'old/path/name' }] };
    var buildRoute = (0, _.createBuildRoute)(ownProps);
    expect(buildRoute('/newroute')).toBe('/newroute');
  });

  test('does not break if no routes array is provided', function () {
    var buildRoute = (0, _.createBuildRoute)({});
    expect(buildRoute('newroute')).toBe('/newroute');
  });

  describe('when provided with an object with route parameters', function () {
    test('joins a simple route', function () {
      var ownProps = { routes: [{ path: 'old' }, { path: 'path' }] };
      var buildRoute = (0, _.createBuildRoute)(ownProps);
      expect(buildRoute('newroute', { param: 'param1' })).toBe('/old/path/newroute');
    });

    test('interprets ../ in the route', function () {
      var ownProps = { routes: [{ path: 'old' }, { path: 'path' }, { path: 'name' }] };
      var buildRoute = (0, _.createBuildRoute)(ownProps);
      expect(buildRoute('../newroute', { param: 'param1' })).toBe('/old/path/newroute');
      expect(buildRoute('../../newroute', { param: 'param1' })).toBe('/old/newroute');
      expect(buildRoute('../useless/../route', { param: 'param1' })).toBe('/old/path/route');
    });

    test('interprets routes starting with /', function () {
      var ownProps = { routes: [{ path: 'old' }, { path: 'path' }] };
      var buildRoute = (0, _.createBuildRoute)(ownProps);
      expect(buildRoute('/newroute', { param: 'param1' })).toBe('/newroute');
    });

    describe('simple param syntax', function () {
      test('keeps the old route parameters if no new value is given', function () {
        var ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute('sessions', { param: 'param1' })).toBe('/group/1/sessions');
      });

      test('updates the old route parameters if a new value is given', function () {
        var ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute('sessions', { groupId: '2' })).toBe('/group/2/sessions');
      });

      test('allows use without a route parameter', function () {
        var ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute({ groupId: '2' })).toBe('/group/2');
      });

      test('does not explode when there is a param omitted', function () {
        var ownProps = {
          routes: [{ path: 'group/:groupId/attendance' }], params: { groupId: '1' }
        };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute({ otherParam: '2' })).toBe('/group/1/attendance');
      });
    });

    describe('optional param syntax', function () {
      test('keeps the old route parameters if no new value is given', function () {
        var ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute('sessions', { param: 'param1' })).toBe('/group/1/sessions');
      });

      test('updates the old route parameters if a new value is given', function () {
        var ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute('sessions', { groupId: '2' })).toBe('/group/2/sessions');
      });

      test('allows use without a route parameter', function () {
        var ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute({ groupId: '2' })).toBe('/group/2');
      });

      test('does not explode when there is an optional param omitted', function () {
        var ownProps = {
          routes: [{ path: 'group(/:groupId)/session(/:sessionId)' }], params: { groupId: '1' }
        };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute({ groupId: '2' })).toBe('/group/2/session');
      });
    });

    describe('mixed param syntax', function () {
      test('allows use when there are simple and optional params together', function () {
        var ownProps = {
          routes: [{ path: 'group/:view(/:mode)' }], params: { view: 'day', mode: 'marking' }
        };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute({ mode: '' })).toBe('/group/day');
      });

      test('allows use with a relative path passed as a string', function () {
        var ownProps = {
          routes: [{ path: 'group/:view(/:mode)' }],
          params: { view: 'day', mode: '' }
        };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute('./marking')).toBe('/group/day/marking');
      });

      test('explodes when there is a mandatory param omitted', function () {
        var ownProps = {
          routes: [{ path: 'group/:view(/:mode)' }],
          params: {}
        };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(function () {
          return buildRoute({ mode: 'marking' });
        }).toThrowError();
      });
    });
  });
});

describe('normalizeUrl()', function () {
  test('supports file:// protocol', function () {
    expect((0, _.normalizeUrl)('file:///test/path')).toBe('file:///test/path');
  });

  test('removes duplicated slashes', function () {
    expect((0, _.normalizeUrl)('/test//path')).toBe('/test/path');
    expect((0, _.normalizeUrl)('/test///path')).toBe('/test/path');
    expect((0, _.normalizeUrl)('/test_///path')).toBe('/test_/path');
    expect((0, _.normalizeUrl)('/test9///path')).toBe('/test9/path');
    expect((0, _.normalizeUrl)('/test-///path')).toBe('/test-/path');
  });

  test('resolves two dots going up one level', function () {
    expect((0, _.normalizeUrl)('/test/../path')).toBe('/path');
    expect((0, _.normalizeUrl)('/test/path/..')).toBe('/test');
    expect((0, _.normalizeUrl)('/test/path9/..')).toBe('/test');
    expect((0, _.normalizeUrl)('/test/path_/..')).toBe('/test');
    expect((0, _.normalizeUrl)('/test/path-/..')).toBe('/test');
    expect((0, _.normalizeUrl)('/test/sublevel/../path')).toBe('/test/path');
    expect((0, _.normalizeUrl)('/../test/path')).toBe('/test/path');
  });

  test('gets rid of "." items', function () {
    expect((0, _.normalizeUrl)('/test/./path')).toBe('/test/path');
    expect((0, _.normalizeUrl)('/test/path/.')).toBe('/test/path');
    expect((0, _.normalizeUrl)('/./test/path')).toBe('/test/path');
    expect((0, _.normalizeUrl)('./test/path')).toBe('test/path');
    expect((0, _.normalizeUrl)('./test/././path')).toBe('test/path');
  });
});
//# sourceMappingURL=spec.js.map
