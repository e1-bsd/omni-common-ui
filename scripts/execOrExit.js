const { exec } = require('shelljs');

module.exports = function execOrExit(command) {
  const result = exec(command, { stdio: 'inherit' });
  result.code === 0 || process.exit(1);
  return result;
};
