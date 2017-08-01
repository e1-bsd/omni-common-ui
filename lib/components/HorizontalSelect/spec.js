'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('react-router', function () {
  var PropTypes = require('prop-types');
  var Link = function Link(_ref) {
    var onClick = _ref.onClick;
    return _react2.default.createElement('div', { onClick: onClick });
  };
  Link.propTypes = { onClick: PropTypes.func };
  return { Link: Link };
});

test('renders option html as a node', function () {
  var helloNodeHtml = _react2.default.createElement(
    'div',
    null,
    'hello'
  );
  var options = [{ html: helloNodeHtml, value: 'hello' }];
  expect((0, _enzyme.shallow)(_react2.default.createElement(_2.default, { options: options })).contains(helloNodeHtml)).toBe(true);
});

test('onSelect is called once being clicked', function () {
  var options = [{
    html: _react2.default.createElement(
      'div',
      null,
      '1'
    ),
    value: 1
  }, {
    html: _react2.default.createElement(
      'div',
      null,
      '2'
    ),
    value: 2
  }];
  var testOnSelect = jest.fn();
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { options: options,
    onSelect: testOnSelect }));
  wrapper.find(_reactRouter2.default.Link).last().simulate('click');
  expect(testOnSelect).toHaveBeenCalledWith(2);
});

test('set active styles to the selected option', function () {
  var options = [{
    html: _react2.default.createElement(
      'div',
      null,
      'hello'
    ),
    value: 1
  }];
  expect((0, _enzyme.shallow)(_react2.default.createElement(_2.default, { options: options, value: 1 })).find('.' + _style2.default.HorizontalSelect_option_active)).toHaveLength(1);
});
//# sourceMappingURL=spec.js.map
