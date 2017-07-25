'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OBSERVER_CONFIG = { childList: true, subtree: true, characterData: true };

var ContentEditable = function (_Component) {
  _inherits(ContentEditable, _Component);

  function ContentEditable() {
    _classCallCheck(this, ContentEditable);

    var _this = _possibleConstructorReturn(this, (ContentEditable.__proto__ || Object.getPrototypeOf(ContentEditable)).call(this));

    _this._emitChange = _this._emitChange.bind(_this);
    return _this;
  }

  _createClass(ContentEditable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      (0, _invariant2.default)(this.htmlEl, 'htmlEl must have been set (via ref)');

      this.observer = new MutationObserver(function (mutations) {
        mutations.forEach(_this2._emitChange);
      });
      this.observer.observe(this.htmlEl, OBSERVER_CONFIG);
    }

    // taken from https://github.com/lovasoa/react-contenteditable

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // We need not rerender if the change of props simply reflects the user's
      // edits. Rerendering in this case would make the cursor/caret jump.
      return (
        // Rerender if there is no element yet... (somehow?)
        !this.htmlEl ||
        // ...or if html really changed... (programmatically, not by user edit)
        nextProps.html !== this.htmlEl.innerHTML && nextProps.html !== this.props.html ||
        // ...or if editing is enabled or disabled.
        this.props.disabled !== nextProps.disabled ||
        // ...or if className changed
        this.props.className !== nextProps.className
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
        // Perhaps React (whose VDOM gets outdated because we often prevent
        // rerendering) did not update the DOM. So we update it manually now.
        this.htmlEl.innerHTML = this.props.html;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.observer.disconnect();
    }
  }, {
    key: '_emitChange',
    value: function _emitChange() {
      if (!this.htmlEl) return;
      var html = this.htmlEl.innerHTML;
      if (this.props.onChange && html !== this.lastHtml) {
        this.props.onChange(html);
      }
      this.lastHtml = html;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          html = _props.html,
          props = _objectWithoutProperties(_props, ['html']);

      // eslint-disable-next-line


      return _react2.default.createElement(
        'div',
        _extends({}, props, {
          ref: function ref(e) {
            _this3.htmlEl = e;
          },
          onBlur: this.props.onBlur || this._emitChange,
          contentEditable: !this.props.disabled,
          dangerouslySetInnerHTML: { __html: html } }),
        this.props.children
      );
    }
  }]);

  return ContentEditable;
}(_react.Component);

exports.default = ContentEditable;


ContentEditable.propTypes = {
  className: _propTypes2.default.string,
  html: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  children: _propTypes2.default.node
};
//# sourceMappingURL=index.js.map
