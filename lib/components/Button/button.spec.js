'use strict';

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _enzyme = require('enzyme');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _type = require('./type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Button', function () {
  it('contains Type object', function () {
    (0, _chai.expect)(_2.default.Type).to.equal(_type.Type);
  });

  it('renders its children', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement('div', { id: 'innerContent' })
    ));
    (0, _chai.expect)(wrapper.contains(_react2.default.createElement('div', { id: 'innerContent' }))).to.be.true;
  });

  it('renders a Link when linkTo is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { linkTo: '/' }));
    (0, _chai.expect)(wrapper.find(_reactRouter.Link)).to.have.length(1);
  });

  it('will open link in a new Tab if newTab is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { linkHref: '/', newTab: true }));
    (0, _chai.expect)(wrapper.prop('target')).to.equal('_blank');
  });

  it('thows error if invalid type is passed', function () {
    (0, _chai.expect)(function () {
      return (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { type: 'faketype' }));
    }).to.throw();
  });

  it('applies proper styles if Type.primary is passed', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { type: _type.Type.primary }));
    (0, _chai.expect)(wrapper.find('.' + _style2.default.__primary)).to.have.length(1);
  });

  it('applies proper styles if Type.default is passed', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { type: _type.Type.default }));
    (0, _chai.expect)(wrapper.find('.' + _style2.default.__default)).to.have.length(1);
  });

  it('uses Type.default if no type is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
    (0, _chai.expect)(wrapper.find('.' + _style2.default.__default).length).to.equal(1);
  });

  it('uses block styles if block property is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { block: true }));
    (0, _chai.expect)(wrapper.find('.' + _style2.default.__block).length).to.equal(1);
  });

  it('uses block styles on Link and itself if block propery is provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { linkTo: '/', block: true }));
    (0, _chai.expect)(wrapper.find('.' + _style2.default.__block).length).to.equal(2);
  });

  it('applies custom attrs when provided', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { attrs: { type: 'submit' } }));
    (0, _chai.expect)(wrapper.find('button[type="submit"]').length).to.equal(1);
  });

  describe('when clicked', function () {
    it('calls onClick', function () {
      var onClick = _sinon2.default.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { onClick: onClick }));
      wrapper.simulate('click');
      (0, _chai.expect)(onClick.called).to.be.true;
    });

    it('sets the .__active class after 100ms', function (done) {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { onClick: function onClick() {} }));
      wrapper.simulate('click');
      setTimeout(function () {
        (0, _chai.expect)(wrapper).to.have.descendants('.' + _style2.default.__active);
        done();
      }, 150);
    });

    it('removes the .__active class when onClick promise is resolved', function (done) {
      var promise = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, 10);
      });
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { onClick: function onClick() {
          return promise;
        },
        onClickActiveClassAddDelay: 0 }));
      wrapper.simulate('click');
      setTimeout(function () {
        (0, _chai.expect)(wrapper.find('.' + _style2.default.__active).length).to.equal(0);
        done();
      }, 50);
    });

    it('does not fail if onClick is not provided', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
      (0, _chai.expect)(function () {
        return wrapper.simulate('click');
      }).to.not.throw();
    });

    it('does nothing if it is disabled', function () {
      var onClick = _sinon2.default.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { onClick: onClick, disabled: true }));
      wrapper.simulate('click');
      (0, _chai.expect)(onClick.called).to.be.false;
    });
  });
});
//# sourceMappingURL=button.spec.js.map
