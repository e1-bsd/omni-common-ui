'use strict';

var _chai = require('chai');

var _ = require('./');

describe('createBuildRoute', function () {
  it('is a function', function () {
    (0, _chai.expect)(_.createBuildRoute).to.be.a('function');
  });

  it('returns a function', function () {
    (0, _chai.expect)((0, _.createBuildRoute)()).to.be.a('function');
  });

  describe('buildRoute', function () {
    it('joins a simple route', function () {
      var ownProps = { location: { pathname: 'oldpathname' } };
      var buildRoute = (0, _.createBuildRoute)(ownProps);
      (0, _chai.expect)(buildRoute('newroute')).to.equal('/oldpathname/newroute');
    });

    it('interprets ../ in the route', function () {
      var ownProps = { location: { pathname: 'old/path/name' } };
      var buildRoute = (0, _.createBuildRoute)(ownProps);
      (0, _chai.expect)(buildRoute('../newroute')).to.equal('/old/path/newroute');
      (0, _chai.expect)(buildRoute('../../newroute')).to.equal('/old/newroute');
      (0, _chai.expect)(buildRoute('../useless/../route')).to.equal('/old/path/route');
    });

    it('interprets routes starting with /', function () {
      var ownProps = { location: { pathname: 'old/path/name' } };
      var buildRoute = (0, _.createBuildRoute)(ownProps);
      (0, _chai.expect)(buildRoute('/newroute')).to.equal('/newroute');
    });

    describe('when provided with an object with route parameters', function () {
      it('joins a simple route', function () {
        var ownProps = { routes: [{ path: 'old' }, { path: 'path' }] };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        (0, _chai.expect)(buildRoute('newroute', { param: 'param1' })).to.equal('/old/path/newroute');
      });

      it('interprets ../ in the route', function () {
        var ownProps = { routes: [{ path: 'old' }, { path: 'path' }, { path: 'name' }] };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        (0, _chai.expect)(buildRoute('../newroute', { param: 'param1' })).to.equal('/old/path/newroute');
        (0, _chai.expect)(buildRoute('../../newroute', { param: 'param1' })).to.equal('/old/newroute');
        (0, _chai.expect)(buildRoute('../useless/../route', { param: 'param1' })).to.equal('/old/path/route');
      });

      it('interprets routes starting with /', function () {
        var ownProps = { routes: [{ path: 'old' }, { path: 'path' }] };
        var buildRoute = (0, _.createBuildRoute)(ownProps);
        (0, _chai.expect)(buildRoute('/newroute', { param: 'param1' })).to.equal('/newroute');
      });

      context('simple param syntax', function () {
        it('keeps the old route parameters if no new value is given', function () {
          var ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
          var buildRoute = (0, _.createBuildRoute)(ownProps);
          (0, _chai.expect)(buildRoute('sessions', { param: 'param1' })).to.equal('/group/1/sessions');
        });

        it('updates the old route parameters if a new value is given', function () {
          var ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
          var buildRoute = (0, _.createBuildRoute)(ownProps);
          (0, _chai.expect)(buildRoute('sessions', { groupId: '2' })).to.equal('/group/2/sessions');
        });

        it('allows use without a route parameter', function () {
          var ownProps = { routes: [{ path: 'group/:groupId' }], params: { groupId: '1' } };
          var buildRoute = (0, _.createBuildRoute)(ownProps);
          (0, _chai.expect)(buildRoute({ groupId: '2' })).to.equal('/group/2');
        });

        it('does not explode when there is a param omitted', function () {
          var ownProps = {
            routes: [{ path: 'group/:groupId/attendance' }], params: { groupId: '1' }
          };
          var buildRoute = (0, _.createBuildRoute)(ownProps);
          (0, _chai.expect)(buildRoute({ otherParam: '2' })).to.equal('/group/1/attendance');
        });
      });

      context('optional param syntax', function () {
        it('keeps the old route parameters if no new value is given', function () {
          var ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
          var buildRoute = (0, _.createBuildRoute)(ownProps);
          (0, _chai.expect)(buildRoute('sessions', { param: 'param1' })).to.equal('/group/1/sessions');
        });

        it('updates the old route parameters if a new value is given', function () {
          var ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
          var buildRoute = (0, _.createBuildRoute)(ownProps);
          (0, _chai.expect)(buildRoute('sessions', { groupId: '2' })).to.equal('/group/2/sessions');
        });

        it('allows use without a route parameter', function () {
          var ownProps = { routes: [{ path: 'group(/:groupId)' }], params: { groupId: '1' } };
          var buildRoute = (0, _.createBuildRoute)(ownProps);
          (0, _chai.expect)(buildRoute({ groupId: '2' })).to.equal('/group/2');
        });

        it('does not explode when there is an optional param omitted', function () {
          var ownProps = {
            routes: [{ path: 'group(/:groupId)/session(/:sessionId)' }], params: { groupId: '1' }
          };
          var buildRoute = (0, _.createBuildRoute)(ownProps);
          (0, _chai.expect)(buildRoute({ groupId: '2' })).to.equal('/group/2/session');
        });
      });

      context('mixed param syntax', function () {
        it('allows use when there are simple and optional params together', function () {
          var ownProps = {
            routes: [{ path: 'group/:view(/:mode)' }], params: { view: 'day', mode: 'marking' }
          };
          var buildRoute = (0, _.createBuildRoute)(ownProps);
          (0, _chai.expect)(buildRoute({ mode: '' })).to.equal('/group/day');
        });

        it('allows use with a relative path passed as a string', function () {
          var ownProps = {
            routes: [{ path: 'group/:view(/:mode)' }],
            params: { view: 'day', mode: '' },
            location: { pathname: '/group/day' }
          };
          var buildRoute = (0, _.createBuildRoute)(ownProps);
          (0, _chai.expect)(buildRoute('./marking')).to.equal('/group/day/marking');
        });

        it('explodes when there is a mandatory param omitted', function () {
          var ownProps = {
            routes: [{ path: 'group/:view(/:mode)' }],
            params: {},
            location: { pathname: '/group/day' }
          };
          var buildRoute = (0, _.createBuildRoute)(ownProps);
          (0, _chai.expect)(function () {
            return buildRoute({ mode: 'marking' });
          }).to.throw();
        });
      });
    });
  });
});
//# sourceMappingURL=spec.js.map
