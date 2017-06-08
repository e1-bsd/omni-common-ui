import parseRoutes from './';

describe('parseRoutes()', () => {
  describe('when receiving strange inputs', () => {
    test('returns the same it receives', () => {
      expect(parseRoutes(undefined)).toBe(undefined);
      expect(parseRoutes(null)).toBe(null);
      expect(parseRoutes(2)).toBe(2);
      expect(parseRoutes('hello')).toBe('hello');
    });
  });

  describe('when receiving a route structure with no functions', () => {
    test('returns the same it receives', () => {
      const routes = {
        component: 'component 1',
        childRoutes: [
          { component: 'component 2' },
          {
            component: 'component 3',
            childRoutes: [
              { component: 'component 4' },
            ],
          },
        ],
      };

      expect(parseRoutes(routes)).toEqual(routes);
    });
  });

  describe('when receiving a route structure with functions', () => {
    test('returns the same it receives', () => {
      const store = { getState: () => 'the state' };
      const routes = ({ getState }) => ({
        component: 'component 1',
        onEnter: () => getState(),
        childRoutes: [
          { component: 'component 2' },
          {
            component: 'component 3',
            childRoutes: [
              { component: 'component 4' },
            ],
          },
        ],
      });

      const result = parseRoutes(routes, store);
      expect(typeof result).toBe('object');
      expect(result.onEnter()).toBe(store.getState());
    });

    test('returns the same it receives', () => {
      const store = { getState: () => 'the state' };
      const routes = {
        component: 'component 1',
        childRoutes: [
          ({ getState }) => ({
            onEnter: () => getState(),
            component: 'component 2',
          }),
          {
            component: 'component 3',
            childRoutes: [
              { component: 'component 4' },
            ],
          },
        ],
      };

      const result = parseRoutes(routes, store);
      expect(typeof result.childRoutes[0]).toBe('object');
      expect(result.childRoutes[0].onEnter()).toBe(store.getState());
    });
  });
});
