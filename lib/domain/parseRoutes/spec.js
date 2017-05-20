'use strict';

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('parseRoutes()', function () {
  context('when receiving strange inputs', function () {
    it('returns the same it receives', function () {
      (0, _chai.expect)((0, _2.default)(undefined)).to.equal(undefined, 'routes is undefined');
      (0, _chai.expect)((0, _2.default)(null)).to.equal(null, 'routes is null');
      (0, _chai.expect)((0, _2.default)(2)).to.equal(2, 'routes is a number');
      (0, _chai.expect)((0, _2.default)('hello')).to.equal('hello', 'routes is a string');
    });
  });

  context('when receiving a route structure with no functions', function () {
    it('returns the same it receives', function () {
      var routes = {
        component: 'component 1',
        childRoutes: [{ component: 'component 2' }, {
          component: 'component 3',
          childRoutes: [{ component: 'component 4' }]
        }]
      };

      (0, _chai.expect)((0, _2.default)(routes)).to.eql(routes);
    });
  });

  context('when receiving a route structure with functions', function () {
    it('returns the same it receives', function () {
      var store = { getState: function getState() {
          return 'the state';
        } };
      var routes = function routes(_ref) {
        var getState = _ref.getState;
        return {
          component: 'component 1',
          onEnter: function onEnter() {
            return getState();
          },
          childRoutes: [{ component: 'component 2' }, {
            component: 'component 3',
            childRoutes: [{ component: 'component 4' }]
          }]
        };
      };

      var result = (0, _2.default)(routes, store);
      (0, _chai.expect)(result).to.be.a('object');
      (0, _chai.expect)(result.onEnter()).to.equal(store.getState());
    });

    it('returns the same it receives', function () {
      var store = { getState: function getState() {
          return 'the state';
        } };
      var routes = {
        component: 'component 1',
        childRoutes: [function (_ref2) {
          var getState = _ref2.getState;
          return {
            onEnter: function onEnter() {
              return getState();
            },
            component: 'component 2'
          };
        }, {
          component: 'component 3',
          childRoutes: [{ component: 'component 4' }]
        }]
      };

      var result = (0, _2.default)(routes, store);
      (0, _chai.expect)(result.childRoutes[0]).to.be.a('object');
      (0, _chai.expect)(result.childRoutes[0].onEnter()).to.equal(store.getState());
    });
  });
});
//# sourceMappingURL=spec.js.map
