'use strict';

var path = require('path');
var fs = require('fs');

var _require = require('immutable'),
    Map = _require.Map;

var files = fs.readdirSync(path.resolve('src/components/Icon')).filter(function (file) {
  return (/\.svg$/.test(file)
  );
}).map(function (file) {
  return path.basename(file, '.svg');
});

module.exports = new Map(files.map(function (file) {
  return [file, file];
}));
//# sourceMappingURL=icons.js.map
