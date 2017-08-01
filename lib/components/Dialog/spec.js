'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders its children if open', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _.Dialog,
    { isOpen: true },
    _react2.default.createElement('div', { id: 'innerContent' })
  ));
  expect(document.getElementById('innerContent')).toBeDefined();
  wrapper.unmount();
});

test('does not render its children if not open', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _.Dialog,
    { isOpen: false },
    _react2.default.createElement('div', { id: 'innerContent' })
  ));
  expect(document.getElementById('innerContent')).toBeFalsy();
  wrapper.unmount();
});

describe('loading overlay', function () {
  test('shows the loading overlay when loading', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _.Dialog,
      { isOpen: true, isLoading: true },
      _react2.default.createElement('div', null)
    ));
    expect(wrapper.find('.' + _style2.default.LoadingOverlay)).toHaveLength(1);
    expect(wrapper.find('.' + _style2.default.LoadingOverlay + '.' + _style2.default.__visible)).toHaveLength(1);
  });

  test('hides the loading overlay when not loading', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _.Dialog,
      { isOpen: true },
      _react2.default.createElement('div', null)
    ));
    expect(wrapper.find('.' + _style2.default.LoadingOverlay)).toHaveLength(1);
    expect(wrapper.find('.' + _style2.default.LoadingOverlay + '.' + _style2.default.__visible)).toHaveLength(0);
  });
});

describe('close button', function () {
  test('contains a close button icon when enabled', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Dialog, { isOpen: true, withCloseButton: true }));
    expect(wrapper.find('.' + _style2.default.Dialog_closeIcon)).toHaveLength(1);
  });

  test('does not contain a close button icon when not enabled', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Dialog, { isOpen: true }));
    expect(wrapper.find('.' + _style2.default.Dialog_closeIcon)).toHaveLength(0);
  });

  test('calls `onRequestClose` when the close button is clicked', function () {
    var onRequestClose = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Dialog, { isOpen: true, withCloseButton: true, onRequestClose: onRequestClose }));
    var button = wrapper.find('.' + _style2.default.Dialog_closeIcon);
    button.simulate('click');
    expect(onRequestClose).toHaveBeenCalledWith('button', undefined);
  });
});
//# sourceMappingURL=spec.js.map
