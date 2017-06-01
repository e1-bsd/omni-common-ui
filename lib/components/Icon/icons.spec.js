'use strict';

var _chai = require('chai');

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var _magnifyingGlass = require('./magnifying-glass.svg');

var _magnifyingGlass2 = _interopRequireDefault(_magnifyingGlass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Icon />', function () {
  describe('icons list', function () {
    var iconId = 'magnifying-glass';

    it('loads the icons properly into a map', function () {
      (0, _chai.expect)(_icons2.default.get(iconId)).to.equal(_magnifyingGlass2.default);
    });
  });
});
//# sourceMappingURL=icons.spec.js.map
