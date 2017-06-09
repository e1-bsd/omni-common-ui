'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('when receiving strange inputs', function () {
  test('returns the same it receives', function () {
    expect((0, _2.default)(undefined)).toBe(undefined);
    expect((0, _2.default)(null)).toBe(null);
    expect((0, _2.default)(2)).toBe(2);
    expect((0, _2.default)('hello')).toBe('hello');
  });
});

describe('when receiving a route structure with no functions', function () {
  test('returns the same it receives', function () {
    var routes = {
      component: 'component 1',
      childRoutes: [{ component: 'component 2' }, {
        component: 'component 3',
        childRoutes: [{ component: 'component 4' }]
      }]
    };

    expect((0, _2.default)(routes)).toEqual(routes);
  });
});

describe('when receiving a route structure with functions', function () {
  test('returns the same it receives', function () {
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
    expect(typeof result === 'undefined' ? 'undefined' : _typeof(result)).toBe('object');
    expect(result.onEnter()).toBe(store.getState());
  });

  test('returns the same it receives', function () {
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
    expect(_typeof(result.childRoutes[0])).toBe('object');
    expect(result.childRoutes[0].onEnter()).toBe(store.getState());
  });
});
//# sourceMappingURL=spec.js.map
