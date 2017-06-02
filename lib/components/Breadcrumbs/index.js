'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RESIZE_DEBOUNCE_MS = 100;

var Breadcrumbs = function (_PureComponent) {
  _inherits(Breadcrumbs, _PureComponent);

  function Breadcrumbs() {
    _classCallCheck(this, Breadcrumbs);

    var _this = _possibleConstructorReturn(this, (Breadcrumbs.__proto__ || Object.getPrototypeOf(Breadcrumbs)).call(this));

    _this.state = {
      isIntermediateCrumbsCollapsed: false,
      collapsedAtWidth: null // populated below
    };
    return _this;
  }

  _createClass(Breadcrumbs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this._updateIntermediateCrumbsCollapsedState();
      window.addEventListener('resize', this.onResizeHandler = (0, _lodash2.default)(function () {
        _this2._updateIntermediateCrumbsCollapsedState();
      }, RESIZE_DEBOUNCE_MS, {
        leading: true, // nicer iOS screen rotate
        trailing: true
      }), false);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._updateIntermediateCrumbsCollapsedState();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.onResizeHandler) return;
      window.removeEventListener('resize', this.onResizeHandler);
    }
  }, {
    key: '_isOverflowingHorizontally',
    value: function _isOverflowingHorizontally() {
      // returns: content width (if overflowing)
      var el = this.listNode;
      var curOverflow = el.style.overflow;

      // set overflows: ul hidden, children visible
      if (!curOverflow || curOverflow === 'visible') {
        el.style.overflow = 'hidden';
      }
      var childOverflows = [];
      Array.prototype.forEach.call(el.children, function (childEl) {
        childOverflows.push(childEl.style.overflow);
        childEl.style.overflow = 'visible'; // eslint-disable-line
      });

      // check clientWidth against scrollWidth; scrollWidth is the width of content
      var isOverflowing = el.clientWidth < el.scrollWidth;
      var scrollWidth = el.scrollWidth;

      // restore overflow

      el.style.overflow = curOverflow;
      Array.prototype.forEach.call(el.children, function (childEl) {
        childEl.style.overflow = childOverflows.shift(); // eslint-disable-line
      });

      return isOverflowing && scrollWidth;
    }
  }, {
    key: '_updateIntermediateCrumbsCollapsedState',
    value: function _updateIntermediateCrumbsCollapsedState() {
      if (!this.props.singleLineMode || !this.listNode) return;

      var navBoxSizing = this.navNode.style.boxSizing;
      this.navNode.style.boxSizing = 'content-box'; // to get width without padding
      var navWidth = Number.parseInt(getComputedStyle(this.navNode).getPropertyValue('width'), 10);
      this.navNode.style.boxSizing = navBoxSizing; // restore

      var contentWidth = void 0;
      if (this.state.isIntermediateCrumbsCollapsed && (_is_js2.default.not.number(this.state.collapsedAtWidth) || navWidth > this.state.collapsedAtWidth)) {
        this.setState({
          isIntermediateCrumbsCollapsed: false,
          collapsedAtWidth: null
        });
      } else if (!this.state.isIntermediateCrumbsCollapsed && ( // eslint-disable-line
      contentWidth = this._isOverflowingHorizontally())) {
        // overflowing - collapse intermediate crumbs
        this.setState({
          isIntermediateCrumbsCollapsed: true,
          collapsedAtWidth: navWidth > this.state.collapsedAtWidth || _is_js2.default.not.number(this.state.collapsedAtWidth) ? contentWidth : this.state.collapsedAtWidth
        });
      }
    }
  }, {
    key: '_renderBackButton',
    value: function _renderBackButton() {
      var _this3 = this;

      var reversedItems = this.props.items.slice(0).reverse();
      var backLinkItem = reversedItems.find(function (item) {
        return item.clickable;
      });
      var backLinkHref = reversedItems[0].backLinkHref;
      if (!_is_js2.default.string(backLinkHref)) {
        if (!_is_js2.default.existy(backLinkItem)) {
          return null;
        }
        backLinkHref = backLinkItem.href;
      }
      return _react2.default.createElement(
        _reactRouter.Link,
        { to: backLinkHref,
          className: _style2.default.Breadcrumbs_crumb_back,
          onClick: function onClick() {
            return _this3._onLinkClick(backLinkItem.label);
          },
          draggable: false },
        _react2.default.createElement(_Icon2.default, { id: 'arrow-left' })
      );
    }
  }, {
    key: '_onLinkClick',
    value: function _onLinkClick(linkLabel) {
      _reactGa2.default.event({
        category: 'Navigation',
        action: 'Clicked breadcrumb',
        label: 'Clicked breadcrumb ' + linkLabel
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      if (!this.props.items || this.props.items.length < 1) return null;

      // make a copy of props.items so that we can mangle it
      var itemsToRender = this.props.items;
      // push collapsed intermediate crumbs if enabled
      if (this.state.isIntermediateCrumbsCollapsed) {
        itemsToRender = [this.props.items[0]];
        if (this.props.items.length > 2) {
          itemsToRender.push({
            label: '…',
            clickable: false
          });
        }
        itemsToRender.push(this.props.items[this.props.items.length - 1]);
      }

      return _react2.default.createElement(
        'nav',
        { className: (0, _classnames4.default)(_style2.default.Breadcrumbs, this.props.className, _defineProperty({}, _style2.default.__wrap, !this.props.singleLineMode)) },
        _react2.default.createElement(
          'ul',
          { className: _style2.default.Breadcrumbs_list,
            ref: function ref(_node) {
              if (!_node) return;
              _this4.listNode = _node;
              _this4.navNode = _node.parentElement;
            } },
          itemsToRender.length === 0 ? null : this._renderBackButton(),
          itemsToRender.map(function (item, idx) {
            var _classnames2;

            var indexedCrumbClassName = _style2.default['Breadcrumbs_crumb_' + idx];
            var itemClassNames = (0, _classnames4.default)(_style2.default.Breadcrumbs_crumb, (_classnames2 = {}, _defineProperty(_classnames2, indexedCrumbClassName, !!indexedCrumbClassName), _defineProperty(_classnames2, _style2.default.__clickable, !!item.clickable), _classnames2));
            var itemKey = item.label + item.href;
            return _react2.default.createElement(
              'li',
              { key: itemKey,
                className: itemClassNames },
              item.clickable ? _react2.default.createElement(
                _reactRouter.Link,
                { to: item.href,
                  onClick: function onClick() {
                    return _this4._onLinkClick(item.label);
                  },
                  draggable: false },
                item.label
              ) : _react2.default.createElement(
                'span',
                null,
                item.label
              )
            );
          })
        )
      );
    }
  }]);

  return Breadcrumbs;
}(_react.PureComponent);

Breadcrumbs.propTypes = {
  className: _propTypes2.default.string,
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string.isRequired,
    href: _propTypes2.default.string.isRequired,
    clickable: _propTypes2.default.bool.isRequired,
    backLinkHref: _propTypes2.default.string // it's an override
  })).isRequired,
  singleLineMode: _propTypes2.default.bool,
  router: _propTypes2.default.shape({
    push: _propTypes2.default.func.isRequired
  }).isRequired
};

exports.default = Breadcrumbs;
//# sourceMappingURL=index.js.map
