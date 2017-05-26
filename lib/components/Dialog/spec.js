'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Dialog', function () {
  it('renders its children if open', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _.Dialog,
      { isOpen: true },
      _react2.default.createElement('div', { id: 'innerContent' })
    ));
    (0, _chai.expect)(document.getElementById('innerContent')).to.exist;
    wrapper.unmount();
  });

  it('does not render its children if not open', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _.Dialog,
      { isOpen: false },
      _react2.default.createElement('div', { id: 'innerContent' })
    ));
    (0, _chai.expect)(document.getElementById('innerContent')).to.not.exist;
    wrapper.unmount();
  });

  context('loading overlay', function () {
    it('shows the loading overlay when loading', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        _.Dialog,
        { isOpen: true, isLoading: true },
        _react2.default.createElement('div', null)
      ));
      (0, _chai.expect)(wrapper).to.have.descendants('.' + _style2.default.LoadingOverlay);
      (0, _chai.expect)(wrapper).to.have.descendants('.' + _style2.default.LoadingOverlay + '.' + _style2.default.__visible);
    });

    it('hides the loading overlay when not loading', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
        _.Dialog,
        { isOpen: true },
        _react2.default.createElement('div', null)
      ));
      (0, _chai.expect)(wrapper).to.have.descendants('.' + _style2.default.LoadingOverlay);
      (0, _chai.expect)(wrapper).to.not.have.descendants('.' + _style2.default.LoadingOverlay + '.' + _style2.default.__visible);
    });
  });

  context('close button', function () {
    it('contains a close button icon when enabled', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Dialog, { isOpen: true, withCloseButton: true }));
      (0, _chai.expect)(wrapper).to.have.descendants('.' + _style2.default.Dialog_closeIcon);
    });

    it('does not contain a close button icon when not enabled', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Dialog, { isOpen: true }));
      (0, _chai.expect)(wrapper).to.not.have.descendants('.' + _style2.default.Dialog_closeIcon);
    });

    it('calls `onRequestClose` when the close button is clicked', function () {
      var onRequestClose = _sinon2.default.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_.Dialog, { isOpen: true, withCloseButton: true, onRequestClose: onRequestClose }));
      var button = wrapper.find('.' + _style2.default.Dialog_closeIcon);
      button.simulate('click');
      (0, _chai.expect)(onRequestClose.calledWith('button')).to.be.true;
    });
  });
});
//# sourceMappingURL=spec.js.map
