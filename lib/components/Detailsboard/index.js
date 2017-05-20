'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Detailsboard = function Detailsboard(props) {
  var classesBoard = (0, _classnames2.default)(_style2.default.Detailsboard_board);
  var classesH5 = (0, _classnames2.default)(_style2.default.Detailsboard_h5);
  var classesP = (0, _classnames2.default)(_style2.default.Detailsboard_p);

  return _react2.default.createElement(
    'div',
    { className: classesBoard },
    _react2.default.createElement(
      'h5',
      { className: classesH5 },
      props.boardTitle
    ),
    _react2.default.createElement(
      'p',
      { className: classesP },
      judgeValue(props.boardValue)
    )
  );

  function judgeValue(boardValue) {
    if (!_is_js2.default.not.undefined(boardValue) || !boardValue || boardValue === '') {
      return '_';
    }
    return boardValue;
  }
};

Detailsboard.propTypes = {
  boardTitle: _react2.default.PropTypes.string.isRequired,
  boardValue: _react2.default.PropTypes.string.isRequired
};

exports.default = Detailsboard;
//# sourceMappingURL=index.js.map
