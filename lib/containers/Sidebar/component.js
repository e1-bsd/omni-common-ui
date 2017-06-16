'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _immutable = require('immutable');

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _testClass = require('./../../domain/testClass');

var _testClass2 = _interopRequireDefault(_testClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require('./../../components/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_PureComponent) {
  _inherits(Sidebar, _PureComponent);

  _createClass(Sidebar, null, [{
    key: '_getItems',
    value: function _getItems(props) {
      var routes = props.routes;

      return new _immutable.List(routes).reduce(function (reduction, value) {
        if (_is_js2.default.not.object(value.sidebar)) {
          return reduction;
        }

        return reduction.merge(value.sidebar);
      }, new _immutable.OrderedMap()).filter(function (item) {
        return item instanceof _immutable.Map && !item.isEmpty();
      }).sortBy(function (item) {
        return item.get('order');
      });
    }
  }, {
    key: '_getColor',
    value: function _getColor(props) {
      var routes = props.routes;

      var colorConfig = new _immutable.List(routes).findLast(function (route) {
        return _is_js2.default.string(route.sidebarColor);
      });
      if (!colorConfig) {
        return undefined;
      }

      return colorConfig.sidebarColor;
    }
  }]);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

    _this._items = Sidebar._getItems(props);
    _this._color = Sidebar._getColor(props);
    _this._onClickedOutside = _this._onClickedOutside.bind(_this);
    _this._onPageScrolled = _this._onPageScrolled.bind(_this);
    return _this;
  }

  _createClass(Sidebar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setUp(this.props);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props) {
      this._items = Sidebar._getItems(props);
      this._color = Sidebar._getColor(props);
      this._setUp(props);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._onPageScrolled();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._removeClickOutsideEvents();
      this._removePageSrolledEvents();
    }
  }, {
    key: '_setUp',
    value: function _setUp(props) {
      if (props.expanded === true) {
        this._addClickOutsideEvents();
        this._addPageSrolledEvents();
      } else {
        this._removeClickOutsideEvents();
        this._removePageSrolledEvents();
      }
    }
  }, {
    key: '_addClickOutsideEvents',
    value: function _addClickOutsideEvents() {
      document.body.addEventListener('click', this._onClickedOutside);
      document.body.addEventListener('touchstart', this._onClickedOutside);
    }
  }, {
    key: '_removeClickOutsideEvents',
    value: function _removeClickOutsideEvents() {
      document.body.removeEventListener('click', this._onClickedOutside);
      document.body.removeEventListener('touchstart', this._onClickedOutside);
    }
  }, {
    key: '_addPageSrolledEvents',
    value: function _addPageSrolledEvents() {
      document.addEventListener('scroll', this._onPageScrolled);
      document.addEventListener('wheel', this._onPageScrolled);
    }
  }, {
    key: '_removePageSrolledEvents',
    value: function _removePageSrolledEvents() {
      document.removeEventListener('scroll', this._onPageScrolled);
      document.removeEventListener('wheel', this._onPageScrolled);
    }
  }, {
    key: '_onClickedOutside',
    value: function _onClickedOutside(evt) {
      if (this._node.contains(evt.target)) {
        return;
      }

      this._contract(evt);
    }
  }, {
    key: '_onPageScrolled',
    value: function _onPageScrolled() {
      if (!this._node) return;
      var expandedNode = this._node.querySelector('.' + _style2.default.Sidebar_expanded);
      if (!expandedNode) {
        return;
      }

      expandedNode.style.paddingTop = 'calc(' + _style2.default.headerSize + ' - ' + document.body.scrollTop + 'px)';
    }
  }, {
    key: '_expand',
    value: function _expand(evt) {
      _is_js2.default.function(this.props.onExpand) && this.props.onExpand(evt);
    }
  }, {
    key: '_contract',
    value: function _contract(evt) {
      _is_js2.default.function(this.props.onCollapse) && this.props.onCollapse(evt);
    }
  }, {
    key: '_renderExpanded',
    value: function _renderExpanded() {
      var _this2 = this;

      var pathname = this.props.location.pathname;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_style2.default.Sidebar_expanded, (0, _testClass2.default)('sidebar-expanded')),
          style: { backgroundColor: this._color } },
        _react2.default.createElement(
          'div',
          { className: _style2.default.Sidebar_close },
          _react2.default.createElement(
            'button',
            { onClick: function onClick(e) {
                return _this2._contract(e);
              },
              className: (0, _classnames2.default)(_style2.default.Sidebar_close_button, (0, _testClass2.default)('sidebar-close')) },
            _react2.default.createElement(_Icon2.default, { className: _style2.default.Sidebar_close_button_icon, id: 'close' })
          )
        ),

        // eslint-disable-next-line react/no-array-index-key
        this._items.map(function (config, link) {
          return _react2.default.createElement(
            _Link2.default,
            { key: link, to: link, currentPath: pathname },
            _react2.default.createElement(
              'button',
              { className: _style2.default.Sidebar_item },
              config.get('text')
            )
          );
        }).toArray()
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this._items.size <= 0) {
        return null;
      }

      var expanded = this.props.expanded;

      var onClickBar = expanded === true ? undefined : function (e) {
        return _this3._expand(e);
      };
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_style2.default.Sidebar, (0, _testClass2.default)('sidebar')),
          onClick: onClickBar,
          style: { backgroundColor: this._color },
          ref: function ref(c) {
            _this3._node = c;
          } },
        _react2.default.createElement(
          _CSSTransitionGroup2.default,
          { transitionName: 'sidebar' },
          expanded === true && this._renderExpanded()
        )
      );
    }
  }]);

  return Sidebar;
}(_react.PureComponent);

Sidebar.propTypes = {
  routes: _propTypes2.default.array.isRequired,
  location: _propTypes2.default.shape({ pathname: _propTypes2.default.string.isRequired }).isRequired,
  expanded: _propTypes2.default.bool,
  onCollapse: _propTypes2.default.func,
  onExpand: _propTypes2.default.func
};

exports.default = Sidebar;
//# sourceMappingURL=component.js.map
