import classnames from 'classnames';

let _testClass = () => {};
if (DEVELOPMENT || TEST || QA) {
  _testClass = (name) => classnames(`test-${name}`);
}

export const testClass = _testClass;
export default testClass;
