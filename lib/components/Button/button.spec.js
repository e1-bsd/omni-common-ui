'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _enzyme = require('enzyme');

var _2 = require('./');

var _3 = _interopRequireDefault(_2);

var _type = require('./type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

jest.mock('react-router', function () {
  return { Link: function Link(props) {
      return _react2.default.createElement('div', props);
    } };
});

beforeEach(function () {
  jest.clearAllTimers();
});

test('contains Type object', function () {
  expect(_3.default.Type).toBe(_type.Type);
});

test('renders its children', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _3.default,
    null,
    _react2.default.createElement('div', { id: 'innerContent' })
  ));
  expect(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).toBe(true);
});

test('thows error if invalid type is passed', function () {
  expect(function () {
    return (0, _enzyme.shallow)(_react2.default.createElement(_3.default, { type: 'faketype' }));
  }).toThrowError();
});

test('applies proper styles if Type.primary is passed', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, { type: _type.Type.primary }));
  expect(wrapper.find('.' + _style2.default.__primary)).toHaveLength(1);
});

test('applies proper styles if Type.default is passed', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, { type: _type.Type.default }));
  expect(wrapper.find('.' + _style2.default.__default)).toHaveLength(1);
});

test('uses Type.default if no type is provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, null));
  expect(wrapper.find('.' + _style2.default.__default).length).toBe(1);
});

test('uses block styles if block property is provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, { block: true }));
  expect(wrapper.find('.' + _style2.default.__block).length).toBe(1);
});

test('applies custom attrs when provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, { attrs: { type: 'submit' } }));
  expect(wrapper.find('button[type="submit"]').length).toBe(1);
});

describe('when it should be rendered as a <button />', function () {
  testButtonClick();
});

describe('when it should be rendered as an <a />', function () {
  test('renders an <a> when linkTo is provided but disabled=true', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, { linkTo: '/', disabled: true }));
    expect(wrapper.find(_reactRouter.Link)).toHaveLength(0);
    expect(wrapper.find('a')).toHaveLength(1);
  });

  test('renders an <a> when linkHref is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, { linkHref: '/' }));
    expect(wrapper.find(_reactRouter.Link)).toHaveLength(0);
    expect(wrapper.find('a')).toHaveLength(1);
  });

  test('will open link in a new Tab if newTab is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, { linkHref: '/', newTab: true }));
    expect(wrapper.prop('target')).toBe('_blank');
  });

  testButtonClick({ linkHref: '/' });
});

describe('when it should be rendered as a <Link />', function () {
  test('renders a Link when linkTo is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, { linkTo: '/' }));
    expect(wrapper.find(_reactRouter.Link)).toHaveLength(1);
  });

  test('uses block styles on Link and itself if block propery is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, { linkTo: '/', block: true }));
    expect(wrapper.find('.' + _style2.default.__block).length).toBe(2);
  });

  testButtonClick({ linkTo: '/' });
});

function testButtonClick() {
  var _this = this;

  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  describe('when clicked', function () {
    test('calls onClick', function () {
      var onClick = jest.fn();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, _extends({}, props, { onClick: onClick })));
      wrapper.simulate('click');
      expect(onClick).toHaveBeenCalled();
    });

    test('does not fail if onClick is not provided', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, props));
      expect(function () {
        return wrapper.simulate('click');
      }).not.toThrowError();
    });

    test('does nothing if it is disabled', function () {
      var onClick = jest.fn();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_3.default, _extends({}, props, { onClick: onClick, disabled: true })));
      wrapper.simulate('click');
      expect(onClick).not.toHaveBeenCalled();
    });

    test('does not fail if the component is unmounted while active', function () {
      var onClick = jest.fn();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_3.default, _extends({}, props, { onClick: onClick, onClickActiveClassAddDelay: 0 })));
      wrapper.simulate('click');
      jest.runTimersToTime(100);
      wrapper.unmount();
      expect(function () {
        return jest.runOnlyPendingTimers(1000);
      }).not.toThrow();
    });

    test('sets the .__active class after 100ms by default', function () {
      jest.useFakeTimers();

      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_3.default, _extends({}, props, { onClick: function onClick() {} })));
      wrapper.simulate('click');
      jest.runTimersToTime(100);

      expect(wrapper.find('.' + _style2.default.__active)).toHaveLength(1);
    });

    test('sets the .__active class after a custom amount of time if onClickActiveClassAddDelay is provided', function () {
      jest.useFakeTimers();

      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_3.default, _extends({}, props, {
        onClick: function onClick() {},
        onClickActiveClassAddDelay: 500 })));
      wrapper.simulate('click');
      jest.runTimersToTime(100);
      expect(wrapper.find('.' + _style2.default.__active)).toHaveLength(0);
      jest.runTimersToTime(400);
      expect(wrapper.find('.' + _style2.default.__active)).toHaveLength(1);
    });

    test('removes the .__active class when onClick promise is resolved', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var resolve, promise, wrapper;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              jest.useFakeTimers();

              resolve = void 0;
              promise = new Promise(function (r) {
                resolve = r;
              });
              wrapper = (0, _enzyme.mount)(_react2.default.createElement(_3.default, _extends({}, props, { onClick: function onClick() {
                  return promise;
                } })));


              wrapper.simulate('click');
              jest.runTimersToTime(100);
              expect(wrapper.find('.' + _style2.default.__active)).toHaveLength(1);

              resolve();
              _context.next = 10;
              return promise;

            case 10:

              expect(wrapper.find('.' + _style2.default.__active)).toHaveLength(0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    })));

    test('removes the .__active class when onClick promise is rejected', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var reject, promise, wrapper;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              jest.useFakeTimers();

              reject = void 0;
              promise = new Promise(function (_, r) {
                reject = r;
              });
              wrapper = (0, _enzyme.mount)(_react2.default.createElement(_3.default, _extends({}, props, { onClick: function onClick() {
                  return promise;
                } })));


              wrapper.simulate('click');
              jest.runTimersToTime(100);
              expect(wrapper.find('.' + _style2.default.__active)).toHaveLength(1);

              reject();
              _context2.prev = 8;
              _context2.next = 11;
              return promise;

            case 11:
              _context2.next = 15;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2['catch'](8);

            case 15:

              expect(wrapper.find('.' + _style2.default.__active)).toHaveLength(0);

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[8, 13]]);
    })));
  });
}
//# sourceMappingURL=button.spec.js.map
