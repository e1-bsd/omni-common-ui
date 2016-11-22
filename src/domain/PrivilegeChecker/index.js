import is from 'is_js';
import { List } from 'immutable';

export default class PrivilegeChecker {
  static hasPrivilege(state, privilege) {
    if (! CONFIG.featureLogin) {
      return true;
    }

    if (is.not.string(privilege) || is.empty(privilege)) {
      return false;
    }

    const privileges = state.get('privileges');
    if (is.not.object(privileges) || ! List.isList(privileges.items)) {
      return false;
    }

    const regEx = new RegExp(`${privilege}$`, 'i');
    return !! privileges.items.find((item) => regEx.test(item));
  }
}
