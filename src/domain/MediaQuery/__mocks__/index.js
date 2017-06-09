module.exports = jest.fn(() => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));
