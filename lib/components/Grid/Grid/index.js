'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gridBig = require('./grid-big.postcss');

var _gridBig2 = _interopRequireDefault(_gridBig);

var _gridCompact = require('./grid-compact.postcss');

var _gridCompact2 = _interopRequireDefault(_gridCompact);

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _MediaQuery = require('./../../../domain/MediaQuery');

var _MediaQuery2 = _interopRequireDefault(_MediaQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_PureComponent) {
  _inherits(Grid, _PureComponent);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

    _this._queryListener = _this._queryListener.bind(_this);
    _this._query = (0, _MediaQuery2.default)('(min-width: 640px)');
    _this.state = { grid: _this._getGrid(_this._query) };
    return _this;
  }

  _createClass(Grid, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { grid: this.state.grid };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._query.addListener(this._queryListener);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._query.removeListener(this._queryListener);
    }
  }, {
    key: '_queryListener',
    value: function _queryListener(mql) {
      var newGrid = this._getGrid(mql);
      if (newGrid !== this.state.grid) {
        this.setState({ grid: newGrid });
      }
    }
  }, {
    key: '_getGrid',
    value: function _getGrid(query) {
      return query.matches ? _gridBig2.default : _gridCompact2.default;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames3.default)(this.state.grid['container-fluid'], _style2.default.Grid, this.props.className, _defineProperty({}, _style2.default.__outerMargin, this.props.outerMargin));
      return _react2.default.createElement(
        'div',
        { className: classes },
        this.props.children
      );
    }
  }]);

  return Grid;
}(_react.PureComponent);

Grid.propTypes = {
  children: _react2.default.PropTypes.node,
  outerMargin: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string
};

Grid.childContextTypes = {
  grid: _react2.default.PropTypes.object
};

exports.default = Grid;
//# sourceMappingURL=index.js.map
