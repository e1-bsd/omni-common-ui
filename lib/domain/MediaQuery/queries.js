'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queries = function Queries() {
  _classCallCheck(this, Queries);

  this.xsQuery = (0, _index.mediaQuery)('(min-width: 20em)');
  this.smQuery = (0, _index.mediaQuery)('(min-width: 30em)');
  this.mdQuery = (0, _index.mediaQuery)('(min-width: 75em)');
  this.state = {
    xs: !!this.xsQuery.matches,
    sm: !!this.smQuery.matches,
    md: !!this.mdQuery.matches
  };
};

exports.default = Queries;
//# sourceMappingURL=queries.js.map
