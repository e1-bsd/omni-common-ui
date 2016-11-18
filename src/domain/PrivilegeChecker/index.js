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
    if (! arePrivilegesLoaded(privileges)) {
      return true;
    }

    const regEx = new RegExp(`${privilege}$`, 'i');
    return !! privileges.items.find((item) => regEx.test(item));
  }
}

function arePrivilegesLoaded(privileges) {
  return is.object(privileges) && is.existy(privileges.items);
}
