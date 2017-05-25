import PureComponent from 'domain/PureComponent';
import { processSilentRenew } from 'redux-oidc';

export default class SingleSignOnSilentRenew extends PureComponent {
  componentWillMount() {
    processSilentRenew();
  }

  render() {
    return null;
  }
}
