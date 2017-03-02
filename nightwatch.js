const path = require('path');

module.exports = {
  src_folders: [path.resolve('qa/tests')],
  output_folder: path.resolve('test-results'),
  custom_commands_path: path.resolve('qa/commands'),
  page_objects_path: path.resolve('qa/pages'),
  test_settings: {
    default: {
      launch_url: '',
      selenium_host: '127.0.0.1',
      selenium_port: 4433,
      silent: true,
      disable_colors: false,
      screenshots: {
        enabled: false,
        path: '',
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
      selenium: {
        start_process: true,
        server_path: path.join(__dirname, './node_modules/selenium-standalone/.selenium/selenium-server/3.0.1-server.jar'),
        log_path: '',
        host: '127.0.0.1',
        port: 4433,
        cli_args: {
          'webdriver.chrome.driver': path.join(__dirname, './node_modules/selenium-standalone/.selenium/chromedriver/2.25-x64-chromedriver'),
        },
      },
    },
  },
};
