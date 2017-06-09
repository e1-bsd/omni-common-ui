import log from './';

test('is a class', () => {
  expect(log.prototype).toBeDefined();
});

testMethod('error');
testMethod('info');
testMethod('log');
testMethod('warn');
testMethod('debug');

test('does not crash if there is no "console"', () => {
  const originalConsole = window.console;
  delete window.console;

  expect(() => log.debug('some text')).not.toThrowError();

  window.console = originalConsole;
});

function testMethod(method) {
  test(`has a "${method}" method`, () => {
    expect(typeof log[method]).toBe('function');
  });
}
