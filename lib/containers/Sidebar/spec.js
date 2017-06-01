'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Sidebar />', function () {
  var props = void 0;
  var onExpand = void 0;
  var onCollapse = void 0;

  beforeEach(function () {
    onExpand = _sinon2.default.spy();
    onCollapse = _sinon2.default.spy();
    props = {
      location: { pathname: '/current/path' },
      routes: [{
        sidebar: {
          '/link/1': { text: 'Link 1' },
          '/link/2': { text: 'Link 2' },
          '/current/path': { text: 'Current path' }
        }
      }],
      onExpand: onExpand,
      onCollapse: onCollapse
    };
  });

  it('renders nothing if no items available', function () {
    (0, _chai.expect)((0, _enzyme.shallow)(_react2.default.createElement(_2.default, null))).to.be.empty;
  });

  it('renders collapsed view by default', function () {
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(_2.default, props))).to.not.have.descendants('.' + _style2.default.Sidebar_expanded);
  });

  it('calls onExpand when clicking on it', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, props));
    wrapper.simulate('click');
    (0, _chai.expect)(onExpand.called).to.be.true;
  });

  context('when expanded', function () {
    var mountAndClick = function mountAndClick() {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, props));
      wrapper.simulate('click');
      return wrapper;
    };

    beforeEach(function () {
      props.expanded = true;
    });

    it('renders as expanded', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, props));
      (0, _chai.expect)(wrapper).to.have.descendants('.' + _style2.default.Sidebar_expanded);
    });

    it('renders items', function () {
      var wrapper = mountAndClick();
      var items = wrapper.find('.' + _style2.default.Sidebar_item);
      (0, _chai.expect)(items).to.have.length(3);
      (0, _chai.expect)(items.at(0)).to.have.text('Link 1');
      (0, _chai.expect)(items.at(1)).to.have.text('Link 2');
      (0, _chai.expect)(items.at(2)).to.have.text('Current path');
    });

    it('calls onCollapse if the user clicks outside', function () {
      mountAndClick();
      document.body.dispatchEvent(new Event('click'));
      (0, _chai.expect)(onCollapse.called).to.be.true;
    });

    it('calls onCollapse if the user taps outside', function () {
      mountAndClick();
      document.body.dispatchEvent(new Event('touchstart'));
      (0, _chai.expect)(onCollapse.called).to.be.true;
    });

    it('allows deeper routes to override configuration', function () {
      props.routes.push({ sidebar: { '/link/1': { text: 'My link' } } });
      var wrapper = mountAndClick();
      var items = wrapper.find('.' + _style2.default.Sidebar_item);
      (0, _chai.expect)(items).to.have.length(3);
      (0, _chai.expect)(items.at(0)).to.have.text('My link');
    });

    it('allows deeper routes to remove an item', function () {
      props.routes.push({ sidebar: { '/link/1': undefined } });
      var wrapper = mountAndClick();
      var items = wrapper.find('.' + _style2.default.Sidebar_item);
      (0, _chai.expect)(items).to.have.length(2);
      (0, _chai.expect)(items.at(0)).to.have.text('Link 2');
    });

    it('renders items according to their order property', function () {
      props.routes[0].sidebar['/link/1'].order = 3;
      props.routes[0].sidebar['/link/2'].order = 1;
      props.routes[0].sidebar['/current/path'].order = 2;
      var wrapper = mountAndClick();
      var items = wrapper.find('.' + _style2.default.Sidebar_item);
      (0, _chai.expect)(items).to.have.length(3);
      (0, _chai.expect)(items.at(0)).to.have.text('Link 2');
      (0, _chai.expect)(items.at(1)).to.have.text('Current path');
      (0, _chai.expect)(items.at(2)).to.have.text('Link 1');
    });
  });
});
//# sourceMappingURL=spec.js.map
