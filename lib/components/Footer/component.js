'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer() {
  return _react2.default.createElement(
    'div',
    { className: _style2.default.Footer },
    _react2.default.createElement(_Icon2.default, { id: 'ef-logo', className: _style2.default.Footer_logo }),
    _react2.default.createElement(
      'div',
      { className: _style2.default.Footer_content },
      _react2.default.createElement(
        'div',
        { className: _style2.default.Footer_content_row },
        _react2.default.createElement(
          'a',
          { className: _style2.default.Footer_content_link,
            target: '_blank',
            rel: 'noopener noreferrer',
            href: 'https://helpcenter.ef.com' },
          'Help Center'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _style2.default.Footer_content_row },
        _react2.default.createElement(
          'div',
          { className: _style2.default.Footer_copyright },
          _react2.default.createElement(
            'span',
            { className: _style2.default.Footer_copyright_firstLine },
            'EF Education First ',
            new Date().getFullYear(),
            '.\xA0'
          ),
          _react2.default.createElement('br', { className: _style2.default.Footer_break }),
          'All rights reserved.'
        )
      )
    )
  );
};

exports.default = Footer;
//# sourceMappingURL=component.js.map
