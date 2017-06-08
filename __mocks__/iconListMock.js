jest.mock('/components/Icon/icons', () => {
  const { Map } = require('immutable'); // eslint-disable-line global-require
  return new Map({ 'test-icon': 'test-icon-content' });
});
