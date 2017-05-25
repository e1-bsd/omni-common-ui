'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style.postcss');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDayPicker = require('react-day-picker');

var _reactDayPicker2 = _interopRequireDefault(_reactDayPicker);

var _moment = require('./../../domain/moment');

var _moment2 = _interopRequireDefault(_moment);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('react-day-picker/lib/style.css');

require('./datePicker.postcss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
  marginBottom: '20px',
  zIndex: '1000'
};

var weekdaysLong = {
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
};

var weekdaysShort = {
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

var months = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

var firstDayOfWeek = {
  en: 1
};

var localeUtils = {
  formatDay: function formatDay(d) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
    return weekdaysLong[locale][d.getDay()] + ',\n     ' + d.getDate() + ' ' + months[locale][d.getMonth()] + ' ' + d.getFullYear();
  },
  formatWeekdayShort: function formatWeekdayShort(index) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
    return weekdaysShort[locale][index];
  },
  formatWeekdayLong: function formatWeekdayLong(index) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
    return weekdaysLong[locale][index];
  },
  getFirstDayOfWeek: function getFirstDayOfWeek(locale) {
    return firstDayOfWeek[locale];
  },
  getMonths: function getMonths(locale) {
    return months[locale];
  },
  formatMonthTitle: function formatMonthTitle(d, locale) {
    return months[locale][d.getMonth()] + ' ' + d.getFullYear();
  }
};

var CalendarPicker = function (_Component) {
  _inherits(CalendarPicker, _Component);

  function CalendarPicker(props) {
    _classCallCheck(this, CalendarPicker);

    var _this = _possibleConstructorReturn(this, (CalendarPicker.__proto__ || Object.getPrototypeOf(CalendarPicker)).call(this, props));

    _this.handleDayClick = _this.handleDayClick.bind(_this);
    _this.handleInputFocus = _this.handleInputFocus.bind(_this);
    _this.handleInputBlur = _this.handleInputBlur.bind(_this);
    _this.handleContainerMouseDown = _this.handleContainerMouseDown.bind(_this);
    _this.state = {
      showOverlay: false
    };
    return _this;
  }

  _createClass(CalendarPicker, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.clickTimeout);
    }
  }, {
    key: 'handleContainerMouseDown',
    value: function handleContainerMouseDown() {
      var _this2 = this;

      this.clickedInside = true;
      this.clickTimeout = setTimeout(function () {
        _this2.clickedInside = false;
      }, 0);
    }
  }, {
    key: 'handleInputFocus',
    value: function handleInputFocus() {
      this.setState({
        showOverlay: true
      });
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur() {
      var showOverlay = this.clickedInside;

      this.setState({
        showOverlay: showOverlay
      });

      if (showOverlay) {
        this.input.focus();
      }
    }
  }, {
    key: 'handleCalendarClick',
    value: function handleCalendarClick() {
      this.input.focus();
    }
  }, {
    key: 'handleDayClick',
    value: function handleDayClick(e, day, _ref) {
      var disabled = _ref.disabled;

      if (disabled) {
        return;
      }

      this.setState({
        showOverlay: false
      });

      this.input.blur();
      this.props.onDateChanged(day);
    }
  }, {
    key: '_initMonth',
    value: function _initMonth() {
      var now = new Date();
      return this.props.day === null ? now : this.props.day;
    }
  }, {
    key: '_displayedValue',
    value: function _displayedValue() {
      return this.props.day ? (0, _moment2.default)(this.props.day).format('YYYY-MM-DD') : '';
    }
  }, {
    key: '_getDate',
    value: function _getDate(datetime) {
      return new Date((0, _moment2.default)(datetime).format('YYYY-MM-DD'));
    }
  }, {
    key: '_disabledDay',
    value: function _disabledDay(day) {
      var disabled = false;
      if (this.props.isDisablePastDay) {
        disabled = _reactDayPicker.DateUtils.isPastDay(day);
      }
      var calendarDate = this._getDate(day);
      var _props = this.props,
          disabledDayBefore = _props.disabledDayBefore,
          disabledDayAfter = _props.disabledDayAfter;

      var disabledDateBefore = disabledDayBefore && this._getDate(disabledDayBefore);
      var disabledDateAfter = disabledDayAfter && this._getDate(disabledDayAfter);
      if (_is_js2.default.not.undefined(disabledDateBefore) && _is_js2.default.undefined(disabledDateAfter)) {
        return disabled || calendarDate < disabledDateBefore;
      } else if (_is_js2.default.undefined(disabledDateBefore) && _is_js2.default.not.undefined(disabledDateAfter)) {
        return disabled || calendarDate > disabledDateAfter;
      } else if (_is_js2.default.not.undefined(disabledDateBefore) && _is_js2.default.not.undefined(disabledDateAfter)) {
        return disabled || calendarDate < disabledDateBefore || calendarDate > disabledDateAfter;
      }

      return disabled;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var inputBorderStyle = (0, _classnames2.default)(_style2.default.CalendarPicker, this.props.isValid ? '' : _style2.default.CalendarPicker_error);
      return _react2.default.createElement(
        'div',
        { onMouseDown: this.handleContainerMouseDown,
          className: inputBorderStyle },
        _react2.default.createElement(
          'div',
          { className: _style2.default.CalendarPicker_clickArea,
            onClick: function onClick() {
              return _this3.handleCalendarClick();
            } },
          _react2.default.createElement('input', { className: _style2.default.CalendarPicker_input,
            type: 'text',
            ref: function ref(el) {
              _this3.input = el;
            },
            value: this._displayedValue(),
            onFocus: this.handleInputFocus,
            onBlur: this.handleInputBlur }),
          _react2.default.createElement(_Icon2.default, { id: 'calendar', className: _style2.default.CalendarPicker_calendarIcon })
        ),
        this.state.showOverlay && _react2.default.createElement(
          'div',
          { className: _style2.default.CalendarPicker_calendar,
            style: { position: 'absolute' } },
          _react2.default.createElement(
            'div',
            { style: overlayStyle },
            this.props.day === null ? _react2.default.createElement(_reactDayPicker2.default, { ref: function ref(el) {
                _this3.daypicker = el;
              },
              enableOutsideDays: true,
              localeUtils: localeUtils,
              onDayClick: this.handleDayClick,
              selectedDays: function selectedDays(day) {
                return _reactDayPicker.DateUtils.isSameDay(_this3.props.day, day);
              },
              disabledDays: function disabledDays(day) {
                return _this3._disabledDay(day);
              } }) : _react2.default.createElement(_reactDayPicker2.default, { ref: function ref(el) {
                _this3.daypicker = el;
              },
              enableOutsideDays: true,
              initialMonth: this.props.day,
              localeUtils: localeUtils,
              onDayClick: this.handleDayClick,
              selectedDays: function selectedDays(day) {
                return _reactDayPicker.DateUtils.isSameDay(_this3.props.day, day);
              },
              disabledDays: function disabledDays(day) {
                return _this3._disabledDay(day);
              } })
          )
        )
      );
    }
  }]);

  return CalendarPicker;
}(_react.Component);

exports.default = CalendarPicker;


CalendarPicker.propTypes = {
  onDateChanged: _propTypes2.default.func,
  day: _propTypes2.default.object,
  isValid: _propTypes2.default.bool,
  disabledDayBefore: _propTypes2.default.object,
  disabledDayAfter: _propTypes2.default.object,
  isDisablePastDay: _propTypes2.default.bool
};
//# sourceMappingURL=index.js.map
