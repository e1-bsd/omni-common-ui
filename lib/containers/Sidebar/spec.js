'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = void 0;

beforeEach(function () {
  props = {
    location: { pathname: '/current/path' },
    routes: [{
      sidebar: {
        '/link/1': { text: 'Link 1' },
        '/link/2': { text: 'Link 2' },
        '/current/path': { text: 'Current path' }
      }
    }],
    onExpand: jest.fn(),
    onCollapse: jest.fn()
  };
});

test('renders nothing if no items available', function () {
  expect((0, _enzyme.shallow)(_react2.default.createElement(_2.default, null)).html()).toBe(null);
});

test('renders collapsed view by default', function () {
  expect((0, _enzyme.mount)(_react2.default.createElement(_2.default, props)).find('.' + _style2.default.Sidebar_expanded)).toHaveLength(0);
});

test('calls onExpand when clicking on it', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, props));
  wrapper.simulate('click');
  expect(props.onExpand).toHaveBeenCalled();
});

describe('when expanded', function () {
  var mountAndClick = function mountAndClick() {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, props));
    wrapper.simulate('click');
    return wrapper;
  };

  beforeEach(function () {
    props.expanded = true;
  });

  test('renders as expanded', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, props));
    expect(wrapper.find('.' + _style2.default.Sidebar_expanded)).toHaveLength(1);
  });

  test('renders items', function () {
    var wrapper = mountAndClick();
    var items = wrapper.find('.' + _style2.default.Sidebar_item);
    expect(items).toHaveLength(3);
    expect(items.at(0).text()).toBe('Link 1');
    expect(items.at(1).text()).toBe('Link 2');
    expect(items.at(2).text()).toBe('Current path');
  });

  test('calls onCollapse if the user clicks outside', function () {
    mountAndClick();
    document.body.dispatchEvent(new Event('click'));
    expect(props.onCollapse).toHaveBeenCalled();
  });

  test('calls onCollapse if the user taps outside', function () {
    mountAndClick();
    document.body.dispatchEvent(new Event('touchstart'));
    expect(props.onCollapse).toHaveBeenCalled();
  });

  test('allows deeper routes to override configuration', function () {
    props.routes.push({ sidebar: { '/link/1': { text: 'My link' } } });
    var wrapper = mountAndClick();
    var items = wrapper.find('.' + _style2.default.Sidebar_item);
    expect(items).toHaveLength(3);
    expect(items.at(0).text()).toBe('My link');
  });

  test('allows deeper routes to remove an item', function () {
    props.routes.push({ sidebar: { '/link/1': undefined } });
    var wrapper = mountAndClick();
    var items = wrapper.find('.' + _style2.default.Sidebar_item);
    expect(items).toHaveLength(2);
    expect(items.at(0).text()).toBe('Link 2');
  });

  test('renders items according to their order property', function () {
    props.routes[0].sidebar['/link/1'].order = 3;
    props.routes[0].sidebar['/link/2'].order = 1;
    props.routes[0].sidebar['/current/path'].order = 2;
    var wrapper = mountAndClick();
    var items = wrapper.find('.' + _style2.default.Sidebar_item);
    expect(items).toHaveLength(3);
    expect(items.at(0).text()).toBe('Link 2');
    expect(items.at(1).text()).toBe('Current path');
    expect(items.at(2).text()).toBe('Link 1');
  });
});
//# sourceMappingURL=spec.js.map
