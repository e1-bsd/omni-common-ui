import is from 'is_js';
import ApiCall from 'containers/ApiCalls';
import { buildUrl } from 'domain/Api';

export default class PrivilegeChecker {
  static hasPrivilege(state, privilege) {
    if (! CONFIG.featureLogin) {
      return true;
    }

    if (is.not.string(privilege) || is.empty(privilege)) {
      return false;
    }

    const privileges = state.get('privileges');
    if (arePrivilegesLoading(state, privileges)) {
      return true;
    }

    const regEx = new RegExp(`${privilege}$`, 'i');
    return !! privileges.items.find((item) => regEx.test(item));
  }
}

function arePrivilegesLoading(state, privileges) {
  const userId = state.get('singleSignOn').user.profile.sub;
  const keyConfig = { method: 'GET', url: buildUrl(`/users/${userId}/privileges`) };
  const apiCallState = ApiCall.find(state, keyConfig);

  return ! ApiCall.State.isValue(apiCallState) ||
      ApiCall.State.isLoading(apiCallState) ||
      is.not.object(privileges) ||
      is.not.existy(privileges.items);
}
