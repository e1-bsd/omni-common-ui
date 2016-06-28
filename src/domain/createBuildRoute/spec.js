import { expect } from 'chai';
import { createBuildRoute } from './';

describe('createBuildRoute', () => {
  it('is a function', () => {
    expect(createBuildRoute).to.be.a('function');
  });

  it('returns a function', () => {
    expect(createBuildRoute()).to.be.a('function');
  });

  describe('buildRoute', () => {
    it('joins a simple route', () => {
      const ownProps = { location: { pathname: 'oldpathname' } };
      const buildRoute = createBuildRoute(ownProps);
      expect(buildRoute('newroute')).to.equal('/oldpathname/newroute');
    });

    it('interprets ../ in the route', () => {
      const ownProps = { location: { pathname: 'old/path/name' } };
      const buildRoute = createBuildRoute(ownProps);
      expect(buildRoute('../newroute')).to.equal('/old/path/newroute');
      expect(buildRoute('../../newroute')).to.equal('/old/newroute');
      expect(buildRoute('../useless/../route')).to.equal('/old/path/route');
    });

    it('interprets routes starting with /', () => {
      const ownProps = { location: { pathname: 'old/path/name' } };
      const buildRoute = createBuildRoute(ownProps);
      expect(buildRoute('/newroute')).to.equal('/newroute');
    });

    describe('when provided with an object with route parameters', () => {
      it('joins a simple route', () => {
        const ownProps = { routes: [{ path: 'old' }, { path: 'path' }] };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute('newroute', { param: 'param1' })).to.equal('/old/path/newroute');
      });

      it('interprets ../ in the route', () => {
        const ownProps = { routes: [{ path: 'old' }, { path: 'path' }, { path: 'name' }] };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute('../newroute', { param: 'param1' })).to.equal('/old/path/newroute');
        expect(buildRoute('../../newroute', { param: 'param1' })).to.equal('/old/newroute');
        expect(buildRoute('../useless/../route', { param: 'param1' })).to.equal('/old/path/route');
      });

      it('interprets routes starting with /', () => {
        const ownProps = { routes: [{ path: 'old' }, { path: 'path' }] };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute('/newroute', { param: 'param1' })).to.equal('/newroute');
      });

      it('keeps the old route parameters if no new value is given', () => {
        const ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute('sessions', { param: 'param1' })).to.equal('/group/1/sessions');
      });

      it('updates the old route parameters if a new value is given', () => {
        const ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute('sessions', { groupId: '2' })).to.equal('/group/2/sessions');
      });

      it('allows to be used without a route parameter', () => {
        const ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
        const buildRoute = createBuildRoute(ownProps);
        expect(buildRoute({ groupId: '2' })).to.equal('/group/2');
      });
    });
  });
});
