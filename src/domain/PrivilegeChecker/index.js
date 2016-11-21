import is from 'is_js';

export default class PrivilegeChecker {
  static hasPrivilege(state, privilege) {
    if (! CONFIG.featureLogin) {
      return true;
    }

    if (is.not.string(privilege) || is.empty(privilege)) {
      return false;
    }

    const privileges = state.get('privileges');
    const regEx = new RegExp(`${privilege}$`, 'i');
    return !! privileges.items.find((item) => regEx.test(item));
  }
}
