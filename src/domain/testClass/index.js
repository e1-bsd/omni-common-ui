import classnames from 'classnames';
import Config from 'domain/Config';

let _testClass = () => {};
if (Config.get('enableTestClasses') === true) {
  _testClass = (name) => classnames(`test-${name}`);
}

export const testClass = _testClass;
export default testClass;
