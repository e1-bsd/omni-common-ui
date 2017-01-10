const resolution = '1024x768';

module.exports = {
  rootUrl: 'http://localhost:8080',
  screenshotsDir: `./gemini/screenshots/${resolution}`,
  windowSize: resolution,
  screenshotMode: 'fullpage',
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        version: '55',
      }
    },
  },
  system: {
    sourceRoot: "./app",
    exclude: ["node_modules/**"],
  },
};
