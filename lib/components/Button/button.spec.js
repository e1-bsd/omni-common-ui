'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _type = require('./type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('contains Type object', function () {
  expect(_2.default.Type).toBe(_type.Type);
});

test('renders its children', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _2.default,
    null,
    _react2.default.createElement('div', { id: 'innerContent' })
  ));
  expect(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).toBe(true);
});

test('renders a Link when linkTo is provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { linkTo: '/' }));
  expect(wrapper.find(_reactRouter.Link)).toHaveLength(1);
});

test('will open link in a new Tab if newTab is provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { linkHref: '/', newTab: true }));
  expect(wrapper.prop('target')).toBe('_blank');
});

test('thows error if invalid type is passed', function () {
  expect(function () {
    return (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { type: 'faketype' }));
  }).toThrowError();
});

test('applies proper styles if Type.primary is passed', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { type: _type.Type.primary }));
  expect(wrapper.find('.' + _style2.default.__primary)).toHaveLength(1);
});

test('applies proper styles if Type.default is passed', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { type: _type.Type.default }));
  expect(wrapper.find('.' + _style2.default.__default)).toHaveLength(1);
});

test('uses Type.default if no type is provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
  expect(wrapper.find('.' + _style2.default.__default).length).toBe(1);
});

test('uses block styles if block property is provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { block: true }));
  expect(wrapper.find('.' + _style2.default.__block).length).toBe(1);
});

test('uses block styles on Link and itself if block propery is provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { linkTo: '/', block: true }));
  expect(wrapper.find('.' + _style2.default.__block).length).toBe(2);
});

test('applies custom attrs when provided', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { attrs: { type: 'submit' } }));
  expect(wrapper.find('button[type="submit"]').length).toBe(1);
});

describe('when clicked', function () {
  test('calls onClick', function () {
    var onClick = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { onClick: onClick }));
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  test('sets the .__active class after 100ms', function () {
    jest.useFakeTimers();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { onClick: function onClick() {} }));
    wrapper.simulate('click');
    jest.runOnlyPendingTimers();

    expect(wrapper.find('.' + _style2.default.__active)).toHaveLength(1);
  });

  test('removes the .__active class when onClick promise is resolved', function () {
    var promise = new Promise(function (resolve) {
      return resolve();
    });
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { onClick: promise, onClickActiveClassAddDelay: 0 }));
    wrapper.simulate('click');

    expect(wrapper.find('.' + _style2.default.__active)).toHaveLength(0);
  });

  test('does not fail if onClick is not provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
    expect(function () {
      return wrapper.simulate('click');
    }).not.toThrowError();
  });

  test('does nothing if it is disabled', function () {
    var onClick = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { onClick: onClick, disabled: true }));
    wrapper.simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });
});
//# sourceMappingURL=button.spec.js.map
