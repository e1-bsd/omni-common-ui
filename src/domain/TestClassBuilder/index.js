import classnames from 'classnames';

let _testClass = () => {};
if (TEST) {
  _testClass = (name) => classnames(`test-${name}`);
}

export const testClass = _testClass;
