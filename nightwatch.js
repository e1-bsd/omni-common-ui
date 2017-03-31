const path = require('path');

module.exports = {
  src_folders: [path.resolve('e2e/tests')],
  output_folder: path.resolve('test-results'),
  custom_commands_path: path.resolve('e2e/commands'),
  page_objects_path: path.resolve('e2e/pages'),
  test_settings: {
    default: {
      launch_url: '',
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
        start_process: false,
        log_path: '',
        host: '127.0.0.1',
        port: 4433,
      },
    },
  },
};
