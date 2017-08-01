'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Person = exports.Profile = exports.Content = exports.StudentCard = undefined;

var _StudentCard2 = require('./StudentCard');

var _StudentCard3 = _interopRequireDefault(_StudentCard2);

var _Content2 = require('./Content');

var _Content3 = _interopRequireDefault(_Content2);

var _Profile2 = require('./Profile');

var _Profile3 = _interopRequireDefault(_Profile2);

var _Person2 = require('./Person');

var _Person3 = _interopRequireDefault(_Person2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StudentCard = exports.StudentCard = _StudentCard3.default;
var Content = exports.Content = _Content3.default;
var Profile = exports.Profile = _Profile3.default;
var Person = exports.Person = _Person3.default;

StudentCard.Content = Content;
StudentCard.Profile = Profile;
StudentCard.Person = Person;

exports.default = StudentCard;
//# sourceMappingURL=index.js.map
