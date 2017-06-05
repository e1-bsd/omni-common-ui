import { createBuildRoute } from './';

test('is a function', () => {
  expect(typeof createBuildRoute).toBe('function');
});

test('returns a function', () => {
  expect(typeof createBuildRoute()).toBe('function');
});

describe('buildRoute', () => {
  test('joins a simple route', () => {
    const ownProps = { location: { pathname: 'oldpathname' } };
    const buildRoute = createBuildRoute(ownProps);
    expect(buildRoute('newroute')).toBe('/oldpathname/newroute');
  });

  test('interprets ../ in the route', () => {
    const ownProps = { location: { pathname: 'old/path/name' } };
    const buildRoute = createBuildRoute(ownProps);
    expect(buildRoute('../newroute')).toBe('/old/path/newroute');
    expect(buildRoute('../../newroute')).toBe('/old/newroute');
    expect(buildRoute('../useless/../route')).toBe('/old/path/route');
  });

  test('interprets routes starting with /', () => {
    const ownProps = { location: { pathname: 'old/path/name' } };
    const buildRoute = createBuildRoute(ownProps);
    expect(buildRoute('/newroute')).toBe('/newroute');
  });

  describe('when provided with an object with route parameters', () => {
    test('joins a simple route', () => {
      const ownProps = { routes: [{ path: 'old' }, { path: 'path' }] };
      const buildRoute = createBuildRoute(ownProps);
      expect(buildRoute('newroute', { param: 'param1' })).toBe('/old/path/newroute');
    });

    test('interprets ../ in the route', () => {
      const ownProps = { routes: [{ path: 'old' }, { path: 'path' }, { path: 'name' }] };
      const buildRoute = createBuildRoute(ownProps);
      expect(buildRoute('../newroute', { param: 'param1' })).toBe('/old/path/newroute');
      expect(buildRoute('../../newroute', { param: 'param1' })).toBe('/old/newroute');
      expect(buildRoute('../useless/../route', { param: 'param1' })).toBe('/old/path/route');
    });

    test('interprets routes starting with /', () => {
      const ownProps = { routes: [{ path: 'old' }, { path: 'path' }] };
      const buildRoute = createBuildRoute(ownProps);
      expect(buildRoute('/newroute', { param: 'param1' })).toBe('/newroute');
    });

    describe('simple param syntax', () => {
      test('keeps the old route parameters if no new value is given', () => {
        const ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute('sessions', { param: 'param1' })).toBe('/group/1/sessions');
      });

      test('updates the old route parameters if a new value is given', () => {
        const ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute('sessions', { groupId: '2' })).toBe('/group/2/sessions');
      });

      test('allows use without a route parameter', () => {
        const ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute({ groupId: '2' })).toBe('/group/2');
      });

      test('does not explode when there is a param omitted', () => {
        const ownProps = {
          routes: [{ path: 'group/:groupId/attendance' }], params: { groupId: '1' },
        };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute({ otherParam: '2' })).toBe('/group/1/attendance');
      });
    });

    describe('optional param syntax', () => {
      test('keeps the old route parameters if no new value is given', () => {
        const ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute('sessions', { param: 'param1' })).toBe('/group/1/sessions');
      });

      test('updates the old route parameters if a new value is given', () => {
        const ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute('sessions', { groupId: '2' })).toBe('/group/2/sessions');
      });

      test('allows use without a route parameter', () => {
        const ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute({ groupId: '2' })).toBe('/group/2');
      });

      test('does not explode when there is an optional param omitted', () => {
        const ownProps = {
          routes: [{ path: 'group(/:groupId)/session(/:sessionId)' }], params: { groupId: '1' },
        };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute({ groupId: '2' })).toBe('/group/2/session');
      });
    });

    describe('mixed param syntax', () => {
      test('allows use when there are simple and optional params together', () => {
        const ownProps = {
          routes: [{ path: 'group/:view(/:mode)' }], params: { view: 'day', mode: 'marking' },
        };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute({ mode: '' })).toBe('/group/day');
      });

      test('allows use with a relative path passed as a string', () => {
        const ownProps = {
          routes: [{ path: 'group/:view(/:mode)' }],
          params: { view: 'day', mode: '' },
          location: { pathname: '/group/day' },
        };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute('./marking')).toBe('/group/day/marking');
      });

      test('explodes when there is a mandatory param omitted', () => {
        const ownProps = {
          routes: [{ path: 'group/:view(/:mode)' }],
          params: { },
          location: { pathname: '/group/day' },
        };
        const buildRoute = createBuildRoute(ownProps);
        expect(() => buildRoute({ mode: 'marking' })).toThrowError();
      });
    });
  });
});
