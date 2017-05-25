'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _PageCard = require('./../PageCard');

var _PageCard2 = _interopRequireDefault(_PageCard);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Level = require('./Level');

var _Level2 = _interopRequireDefault(_Level);

var _Leaf = require('./Leaf');

var _Leaf2 = _interopRequireDefault(_Leaf);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectionTable = function (_Component) {
  _inherits(SelectionTable, _Component);

  function SelectionTable(props) {
    _classCallCheck(this, SelectionTable);

    var _this = _possibleConstructorReturn(this, (SelectionTable.__proto__ || Object.getPrototypeOf(SelectionTable)).call(this, props));

    _this.state = { route: [] };
    _this._setUpData(props);
    return _this;
  }

  _createClass(SelectionTable, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props) {
      this._setUpData(props);
    }
  }, {
    key: '_setUpData',
    value: function _setUpData(props) {
      var children = _react2.default.Children.toArray(props.children);
      this._level = children.filter(function (child) {
        return child.type === _Level2.default;
      });
      this._header = children.find(function (child) {
        return child.type === _Header2.default;
      });
    }
  }, {
    key: '_onLevelClick',
    value: function _onLevelClick(route) {
      this.setState({ route: route });
    }
  }, {
    key: '_cloneArray',
    value: function _cloneArray(arr) {
      return arr.slice(0);
    }
  }, {
    key: '_renderContent',
    value: function _renderContent() {
      var _this2 = this;

      var levels = this._cloneArray(this._level);
      var tempRoutes = this._cloneArray(this.state.route);

      var _loop = function _loop() {
        var currentRoute = tempRoutes.shift();
        levels = levels.find(function (level) {
          return level.props.label === currentRoute;
        });
        levels = _is_js2.default.array(levels.props.children) ? _this2._cloneArray(levels.props.children) : levels.props.children;
      };

      while (tempRoutes.length !== 0) {
        _loop();
      }

      if (tempRoutes.length === 0) {
        return this._renderLevels(levels);
      }
    }
  }, {
    key: '_renderLevels',
    value: function _renderLevels(levels) {
      var _this3 = this;

      if (!_is_js2.default.array(levels) && levels.type === _Leaf2.default) {
        return _react2.default.createElement(
          _Leaf2.default,
          null,
          levels.props.children
        );
      }
      return _react2.default.createElement(
        'div',
        null,
        levels.map(function (level) {
          return _react2.default.createElement(
            _Level2.default,
            { key: level.props.label,
              route: _this3.state.route,
              label: level.props.label,
              onClick: function onClick(route) {
                return _this3._onLevelClick(route);
              } },
            level.props.children
          );
        })
      );
    }
  }, {
    key: '_renderHeading',
    value: function _renderHeading() {
      var _this4 = this;

      var _props = this.props,
          title = _props.title,
          rootLinkTitle = _props.rootLinkTitle,
          hideRootLink = _props.hideRootLink,
          headerClassName = _props.headerClassName;

      var routes = this._cloneArray(this.state.route);
      var onHeadingRouteClick = function onHeadingRouteClick(route) {
        var routeIndex = routes.indexOf(route);
        if (routeIndex >= 0) {
          var newRoute = routes.slice(0, routeIndex + 1);
          _this4.setState({ route: newRoute });
        }
      };
      var onHeadingBackClick = function onHeadingBackClick() {
        _this4.setState({ route: routes.slice(0, routes.length - 1) });
      };

      var onHeadingRootClick = function onHeadingRootClick() {
        _this4.setState({ route: [] });
      };
      var headingRouteClassName = _style2.default.SelectionTable_heading_route;
      var headingBackClassName = _style2.default.SelectionTable_heading_back;
      if (_is_js2.default.array(routes) && routes.length > 0) {
        return _react2.default.createElement(
          _PageCard2.default.Heading,
          { className: _style2.default.SelectionTable_heading },
          _react2.default.createElement(
            'span',
            { className: headingBackClassName, onClick: function onClick() {
                return onHeadingBackClick();
              } },
            _react2.default.createElement(_Icon2.default, { id: 'arrow-left' })
          ),
          _is_js2.default.falsy(hideRootLink) ? _react2.default.createElement(
            'span',
            { className: headingRouteClassName, onClick: function onClick() {
                return onHeadingRootClick();
              } },
            _is_js2.default.undefined(rootLinkTitle) ? title : rootLinkTitle
          ) : null,
          routes.map(function (route) {
            return _react2.default.createElement(
              'span',
              { key: route,
                className: headingRouteClassName,
                onClick: function onClick() {
                  return onHeadingRouteClick(route);
                } },
              route
            );
          })
        );
      }
      return _react2.default.createElement(
        _PageCard2.default.Heading,
        { className: headerClassName, text: this.props.title },
        _is_js2.default.existy(this._header) ? this._header : null
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _PageCard2.default,
        null,
        this._renderHeading(),
        _react2.default.createElement(
          'div',
          null,
          this._renderContent()
        )
      );
    }
  }]);

  return SelectionTable;
}(_react.Component);

SelectionTable.propTypes = {
  children: _propTypes2.default.node,
  title: _propTypes2.default.string,
  rootLinkTitle: _propTypes2.default.string,
  headerClassName: _propTypes2.default.string,
  hideRootLink: _propTypes2.default.bool
};

exports.default = SelectionTable;
//# sourceMappingURL=component.js.map
