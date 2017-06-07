const path = require('path');

module.exports = {
  process: (_, filename) => `module.exports = '${path.basename(filename)}';`,
};
