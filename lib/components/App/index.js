'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapStateToProps = mapStateToProps;

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./../../containers/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Sidebar = require('./../../containers/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Footer = require('./../Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _testClass = require('./../../domain/testClass');

var _testClass2 = _interopRequireDefault(_testClass);

var _Breadcrumbs = require('./../Breadcrumbs');

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _HistoryLink = require('./../HistoryLink');

var _HistoryLink2 = _interopRequireDefault(_HistoryLink);

var _connect = require('./../../domain/connect');

var _connect2 = _interopRequireDefault(_connect);

var _PerformanceProfiler = require('./../PerformanceProfiler');

var _PerformanceProfiler2 = _interopRequireDefault(_PerformanceProfiler);

var _Config = require('./../../domain/Config');

var _Config2 = _interopRequireDefault(_Config);

var _BreadcrumbsBuilder = require('./../../domain/BreadcrumbsBuilder');

var _BreadcrumbsBuilder2 = _interopRequireDefault(_BreadcrumbsBuilder);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_PureComponent) {
  _inherits(App, _PureComponent);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = { sidebarExpanded: false };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setPageTitle(this.props);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props) {
      this._setPageTitle(props);
    }
  }, {
    key: '_collapseSidebar',
    value: function _collapseSidebar(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.setState({ sidebarExpanded: false });
    }
  }, {
    key: '_expandSidebar',
    value: function _expandSidebar(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.setState({ sidebarExpanded: true });
    }
  }, {
    key: '_onHamburgerClick',
    value: function _onHamburgerClick(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.setState(function (_ref) {
        var sidebarExpanded = _ref.sidebarExpanded;
        return { sidebarExpanded: !sidebarExpanded };
      });
    }
  }, {
    key: '_setPageTitle',
    value: function _setPageTitle(props) {
      this._breadcrumbs = _BreadcrumbsBuilder2.default.buildWithProps(props);
      var visibleBreadcrumbCount = this._breadcrumbs && this._breadcrumbs.filter(function (bc) {
        return !bc.hidden;
      }).length;
      if (!this._breadcrumbs || visibleBreadcrumbCount <= 0) {
        document.title = _Config2.default.get('displayTitle');
      } else {
        document.title = this._breadcrumbs.filter(function (bc) {
          return !bc.hidden;
        }).reduce(function (result, item, index) {
          return '' + result + (index !== 0 ? ' / ' : '') + item.label;
        }, _Config2.default.get('displayTitle') + ' - ');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var user = this.props.user;

      if (!user || user.expired) return null;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_style2.default.App, (0, _testClass2.default)('app')) },
        !PRODUCTION && _Config2.default.get('performanceProfiler') === true && _react2.default.createElement(_PerformanceProfiler2.default, null),
        _react2.default.createElement(_Header2.default, _extends({}, this.props, { onHamburgerClick: function onHamburgerClick(e) {
            return _this2._onHamburgerClick(e);
          } })),
        _react2.default.createElement(
          'div',
          { className: _style2.default.App_wrap },
          _react2.default.createElement(_Sidebar2.default, _extends({}, this.props, {
            expanded: this.state.sidebarExpanded,
            onExpand: function onExpand(e) {
              return _this2._expandSidebar(e);
            },
            onCollapse: function onCollapse(e) {
              return _this2._collapseSidebar(e);
            } })),
          _react2.default.createElement(
            'div',
            { className: _style2.default.App_content },
            _react2.default.createElement(
              'div',
              { className: _style2.default.App_content_auxiliary },
              this._breadcrumbs && _react2.default.createElement(_Breadcrumbs2.default, { className: _style2.default.App_content_auxiliary_breadcrumbs,
                items: this._breadcrumbs,
                singleLineMode: true }),
              _react2.default.createElement(_HistoryLink2.default, _extends({ className: _style2.default.App_content_auxiliary_historyLink }, this.props))
            ),
            _react2.default.createElement(
              'div',
              { className: _style2.default.App_content_wrap },
              this.props.children
            )
          )
        ),
        _react2.default.createElement(_Footer2.default, null)
      );
    }
  }]);

  return App;
}(_react.PureComponent);

App.propTypes = {
  user: _propTypes2.default.shape({
    expired: _propTypes2.default.bool
  }),
  children: _propTypes2.default.node
};

function mapStateToProps(state) {
  return { user: state.get('singleSignOn').get('user') };
}

exports.default = (0, _connect2.default)(mapStateToProps)(App);
//# sourceMappingURL=index.js.map
