import { expect } from 'chai';
import parseRoutes from './';

describe('parseRoutes()', () => {
  context('when receiving strange inputs', () => {
    it('returns the same it receives', () => {
      expect(parseRoutes(undefined)).to.equal(undefined, 'routes is undefined');
      expect(parseRoutes(null)).to.equal(null, 'routes is null');
      expect(parseRoutes(2)).to.equal(2, 'routes is a number');
      expect(parseRoutes('hello')).to.equal('hello', 'routes is a string');
    });
  });

  context('when receiving a route structure with no functions', () => {
    it('returns the same it receives', () => {
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

      expect(parseRoutes(routes)).to.eql(routes);
    });
  });

  context('when receiving a route structure with functions', () => {
    it('returns the same it receives', () => {
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
      expect(result).to.be.a('object');
      expect(result.onEnter()).to.equal(store.getState());
    });

    it('returns the same it receives', () => {
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
      expect(result.childRoutes[0]).to.be.a('object');
      expect(result.childRoutes[0].onEnter()).to.equal(store.getState());
    });
  });
});
