import styles from './style.postcss';

import React from 'react';
import PureComponent from 'domain/PureComponent';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'domain/moment';
import is from 'is_js';
import classnames from 'classnames';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';

import 'react-day-picker/lib/style.css';
import './datePicker.postcss';

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
  marginBottom: '20px',
  zIndex: '1000',
};

const weekdaysLong = {
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};

const weekdaysShort = {
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

const months = {
  en: ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'],
};

const firstDayOfWeek = {
  en: 1,
};

const localeUtils = {
  formatDay: (d, locale = 'en') =>
    `${weekdaysLong[locale][d.getDay()]},
     ${d.getDate()} ${months[locale][d.getMonth()]} ${d.getFullYear()}`,
  formatWeekdayShort: (index, locale = 'en') => weekdaysShort[locale][index],
  formatWeekdayLong: (index, locale = 'en') => weekdaysLong[locale][index],
  getFirstDayOfWeek: (locale) => firstDayOfWeek[locale],
  getMonths: (locale) => months[locale],
  formatMonthTitle: (d, locale) => `${months[locale][d.getMonth()]} ${d.getFullYear()}`,
};

export default class CalendarPicker extends PureComponent {

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this);
    this.state = {
      showOverlay: false,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.clickTimeout);
  }

  handleContainerMouseDown() {
    this.clickedInside = true;
    this.clickTimeout = setTimeout(() => {
      this.clickedInside = false;
    }, 0);
  }

  handleInputFocus() {
    this.setState({
      showOverlay: true,
    });
  }

  handleInputBlur() {
    const showOverlay = this.clickedInside;

    this.setState({
      showOverlay,
    });

    if (showOverlay) {
      this.input.focus();
    }
  }

  handleCalendarClick() {
    this.input.focus();
  }

  handleDayClick(e, day, { disabled }) {
    if (disabled) {
      return;
    }

    this.setState({
      showOverlay: false,
    });

    this.input.blur();
    this.props.onDateChanged(day);
  }

  _initMonth() {
    const now = new Date();
    return this.props.day === null ? now :
      this.props.day;
  }

  _displayedValue() {
    return this.props.day ? moment(this.props.day).format('YYYY-MM-DD') : '';
  }

  _getDate(datetime) {
    return new Date(moment(datetime).format('YYYY-MM-DD'));
  }

  _disabledDay(day) {
    let disabled = false;
    if (this.props.isDisablePastDay) {
      disabled = DateUtils.isPastDay(day);
    }
    const calendarDate = this._getDate(day);
    const { disabledDayBefore, disabledDayAfter } = this.props;
    const disabledDateBefore = disabledDayBefore && this._getDate(disabledDayBefore);
    const disabledDateAfter = disabledDayAfter && this._getDate(disabledDayAfter);
    if (is.not.undefined(disabledDateBefore) &&
        is.undefined(disabledDateAfter)) {
      return disabled || calendarDate < disabledDateBefore;
    } else if (is.undefined(disabledDateBefore) &&
        is.not.undefined(disabledDateAfter)) {
      return disabled || calendarDate > disabledDateAfter;
    } else if (is.not.undefined(disabledDateBefore) &&
        is.not.undefined(disabledDateAfter)) {
      return disabled ||
        (calendarDate < disabledDateBefore) ||
        (calendarDate > disabledDateAfter);
    }

    return disabled;
  }

  render() {
    const inputBorderStyle = classnames(styles.CalendarPicker,
      this.props.isValid ? '' : styles.CalendarPicker_error);
    return (
      <div onMouseDown={this.handleContainerMouseDown}
          className={inputBorderStyle}>
        <div className={styles.CalendarPicker_clickArea}
            onClick={() => this.handleCalendarClick()}>
          <input className={styles.CalendarPicker_input}
              type="text"
              ref={(el) => { this.input = el; }}
              value={this._displayedValue()}
              onFocus={this.handleInputFocus}
              onBlur={this.handleInputBlur} />
          <Icon id="calendar" className={styles.CalendarPicker_calendarIcon} />
        </div>
        { this.state.showOverlay &&
          <div className={styles.CalendarPicker_calendar}
              style={{ position: 'absolute' }}>
            <div style={overlayStyle}>
              {this.props.day === null ?
                <DayPicker ref={(el) => { this.daypicker = el; }}
                    enableOutsideDays
                    localeUtils={localeUtils}
                    onDayClick={this.handleDayClick}
                    selectedDays={(day) => DateUtils.isSameDay(this.props.day, day)}
                    disabledDays={(day) => this._disabledDay(day)} /> :
                    <DayPicker ref={(el) => { this.daypicker = el; }}
                        enableOutsideDays
                        initialMonth={this.props.day}
                        localeUtils={localeUtils}
                        onDayClick={this.handleDayClick}
                        selectedDays={(day) => DateUtils.isSameDay(this.props.day, day)}
                        disabledDays={(day) => this._disabledDay(day)} />
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

CalendarPicker.propTypes = {
  onDateChanged: PropTypes.func,
  day: PropTypes.object,
  isValid: PropTypes.bool,
  disabledDayBefore: PropTypes.object,
  disabledDayAfter: PropTypes.object,
  isDisablePastDay: PropTypes.bool,
};
