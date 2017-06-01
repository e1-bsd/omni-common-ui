'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _CheckboxList = require('./CheckboxList');

var _CheckboxList2 = _interopRequireDefault(_CheckboxList);

var _RadioList = require('./RadioList');

var _RadioList2 = _interopRequireDefault(_RadioList);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Form2.default.CheckboxList = _CheckboxList2.default;
_Form2.default.RadioList = _RadioList2.default;
_Form2.default.Select = _Select2.default;
_Form2.default.TextInput = _TextInput2.default;

exports.default = _Form2.default;
//# sourceMappingURL=index.js.map
