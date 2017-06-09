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
    var ownProps = { location: { pathname: 'oldpathname' } };
    var buildRoute = (0, _.createBuildRoute)(ownProps);
    expect(buildRoute('newroute')).toMatch('/oldpathname/newroute');
  });

  test('interprets ../ in the route', function () {
    var ownProps = { location: { pathname: 'old/path/name' } };
    var buildRoute = (0, _.createBuildRoute)(ownProps);
    expect(buildRoute('../newroute')).toMatch('/old/path/newroute');
    expect(buildRoute('../../newroute')).toMatch('/old/newroute');
    expect(buildRoute('../useless/../route')).toMatch('/old/path/route');
  });

  test('interprets routes starting with /', function () {
    var ownProps = { location: { pathname: 'old/path/name' } };
    var buildRoute = (0, _.createBuildRoute)(ownProps);
    expect(buildRoute('/newroute')).toMatch('/newroute');
  });

  describe('when provided with an object with route parameters', function () {
    test('joins a simple route', function () {
      var ownProps = { routes: [{ path: 'old' }, { path: 'path' }] };
      var buildRoute = (0, _.createBuildRoute)(ownProps);
      expect(buildRoute('newroute', { param: 'param1' })).toMatch('/old/path/newroute');
    });

    test('interprets ../ in the route', function () {
      var ownProps = { routes: [{ path: 'old' }, { path: 'path' }, { path: 'name' }] };
      var buildRoute = (0, _.createBuildRoute)(ownProps);
      expect(buildRoute('../newroute', { param: 'param1' })).toMatch('/old/path/newroute');
      expect(buildRoute('../../newroute', { param: 'param1' })).toMatch('/old/newroute');
      expect(buildRoute('../useless/../route', { param: 'param1' })).toMatch('/old/path/route');
    });

    test('interprets routes starting with /', function () {
      var ownProps = { routes: [{ path: 'old' }, { path: 'path' }] };
      var buildRoute = (0, _.createBuildRoute)(ownProps);
      expect(buildRoute('/newroute', { param: 'param1' })).toMatch('/newroute');
    });

    describe('simple param syntax', function () {
      test('keeps the old route parameters if no new value is given', function () {
        var ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute('sessions', { param: 'param1' })).toMatch('/group/1/sessions');
      });

      test('updates the old route parameters if a new value is given', function () {
        var ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute('sessions', { groupId: '2' })).toMatch('/group/2/sessions');
      });

      test('allows use without a route parameter', function () {
        var ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute({ groupId: '2' })).toMatch('/group/2');
      });

      test('does not explode when there is a param omitted', function () {
        var ownProps = {
          routes: [{ path: 'group/:groupId/attendance' }], params: { groupId: '1' }
        };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute({ otherParam: '2' })).toMatch('/group/1/attendance');
      });
    });

    describe('optional param syntax', function () {
      test('keeps the old route parameters if no new value is given', function () {
        var ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute('sessions', { param: 'param1' })).toMatch('/group/1/sessions');
      });

      test('updates the old route parameters if a new value is given', function () {
        var ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute('sessions', { groupId: '2' })).toMatch('/group/2/sessions');
      });

      test('allows use without a route parameter', function () {
        var ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute({ groupId: '2' })).toMatch('/group/2');
      });

      test('does not explode when there is an optional param omitted', function () {
        var ownProps = {
          routes: [{ path: 'group(/:groupId)/session(/:sessionId)' }], params: { groupId: '1' }
        };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute({ groupId: '2' })).toMatch('/group/2/session');
      });
    });

    describe('mixed param syntax', function () {
      test('allows use when there are simple and optional params together', function () {
        var ownProps = {
          routes: [{ path: 'group/:view(/:mode)' }], params: { view: 'day', mode: 'marking' }
        };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute({ mode: '' })).toMatch('/group/day');
      });

      test('allows use with a relative path passed as a string', function () {
        var ownProps = {
          routes: [{ path: 'group/:view(/:mode)' }],
          params: { view: 'day', mode: '' },
          location: { pathname: '/group/day' }
        };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(buildRoute('./marking')).toMatch('/group/day/marking');
      });

      test('explodes when there is a mandatory param omitted', function () {
        var ownProps = {
          routes: [{ path: 'group/:view(/:mode)' }],
          params: {},
          location: { pathname: '/group/day' }
        };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        expect(function () {
          return buildRoute({ mode: 'marking' });
        }).toThrowError();
      });
    });
  });
});
//# sourceMappingURL=spec.js.map
