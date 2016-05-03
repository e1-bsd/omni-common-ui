/* jshint node:true */

const appDirTests = require.context('./src', true, /\.?spec\.jsx?$/);
appDirTests.keys().forEach(appDirTests);
