import { PureComponent } from 'react';
import { processSilentRenew } from 'redux-oidc';

export default class SingleSignOnSilentRenew extends PureComponent {
  componentWillMount() {
    processSilentRenew();
  }

  render() {
    return null;
  }
}
