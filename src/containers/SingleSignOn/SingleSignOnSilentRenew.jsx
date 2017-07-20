import { PureComponent } from 'react';
import { createUserManager } from 'data/SingleSignOn';

const processSilentRenew = () => {
  const mgr = createUserManager();
  mgr.signInSilentCallback();
};

export default class SingleSignOnSilentRenew extends PureComponent {
  componentWillMount() {
    processSilentRenew();
  }

  render() {
    return null;
  }
}
