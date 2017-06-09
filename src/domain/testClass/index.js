import invariant from 'invariant';
import classnames from 'classnames';
import Config from 'domain/Config';

const TEST_REGEXP = /^[a-z][0-9a-z-_]*$/i;

let _testClass = () => {};
if (Config.get('enableTestClasses') === true) {
  _testClass = (name) => {
    invariant(TEST_REGEXP.test(name), 'Test classes must start with a letter and contain only a-z, 0-9, _ and -.');
    return classnames(`test-${name}`);
  };
}

export const testClass = _testClass;
export default testClass;
