'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<HorizontalSelect />', function () {
  // eslint-disable-next-line react/prop-types
  var Link = function Link(_ref) {
    var onClick = _ref.onClick;
    return _react2.default.createElement('div', { onClick: onClick });
  };
  var HorizontalSelect = void 0;

  beforeEach(function () {
    // eslint-disable-next-line global-require, import/no-webpack-loader-syntax
    HorizontalSelect = require('inject?react-router!./')({
      'react-router': { Link: Link }
    }).default;
  });

  it('renders option html as a node', function () {
    var helloNodeHtml = _react2.default.createElement(
      'div',
      null,
      'hello'
    );
    var options = [{
      html: helloNodeHtml,
      value: 'hello'
    }];
    (0, _chai.expect)((0, _enzyme.shallow)(_react2.default.createElement(HorizontalSelect, { options: options }))).to.contain(helloNodeHtml);
  });

  it('onSelect is called once being clicked', function () {
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
    var testOnSelect = _sinon2.default.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(HorizontalSelect, { options: options,
      onSelect: testOnSelect }));
    wrapper.find(Link).last().simulate('click');
    (0, _chai.expect)(testOnSelect.args[0]).to.eql([2]);
  });

  it('set active styles to the selected option', function () {
    var options = [{
      html: _react2.default.createElement(
        'div',
        null,
        'hello'
      ),
      value: 1
    }];
    (0, _chai.expect)((0, _enzyme.shallow)(_react2.default.createElement(HorizontalSelect, { options: options, value: 1 })).find('.' + _style2.default.HorizontalSelect_option_active)).to.have.length(1);
  });
});
//# sourceMappingURL=spec.js.map
