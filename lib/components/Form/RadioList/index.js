'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('react-select/dist/react-select.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioList = function RadioList(props) {
  var name = props.name,
      label = props.label,
      items = props.items;

  return _react2.default.createElement(
    _Field2.default,
    { label: label,
      getErrorMessage: function getErrorMessage() {
        return props.getErrorMessage();
      },
      showError: function showError() {
        return props.showError();
      },
      showRequired: function showRequired() {
        return props.showRequired();
      } },
    items.map(function (item, i) {
      return _react2.default.createElement(_Radio2.default, { item: item,
        name: name,
        key: i,
        onChecked: function onChecked(e, option) {
          return handleChange(e, option);
        } });
    })
  );

  function handleChange(e, item) {
    props.setValue(item);
  }
};

RadioList.propTypes = {
  showRequired: _react2.default.PropTypes.func.isRequired,
  setValue: _react2.default.PropTypes.func.isRequired,
  name: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  items: _react2.default.PropTypes.array.isRequired
};

exports.default = (0, _formsyReact.HOC)(RadioList);
//# sourceMappingURL=index.js.map
