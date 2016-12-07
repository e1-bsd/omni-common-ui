import classnames from 'classnames';

let _testClass = () => {};
if (! PRODUCTION) {
  _testClass = (name) => classnames(`test-${name}`);
}

export const testClass = _testClass;
export default testClass;
