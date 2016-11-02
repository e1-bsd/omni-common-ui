import ApiResponseHelper from 'domain/ApiResponseHelper';
import log from 'loglevel';

export default class PrivilegeChecker {
  static hasPrivilege(state, privilege) {
    if (! CONFIG.featureLogin) {
      return true;
    }

    const privileges = state.get('rootReducer').get('privileges');
    if (ApiResponseHelper.shouldFetch(privileges) || ApiResponseHelper.isLoading(privileges)) {
      // This should never happen, since the privileges are fetched before anything is rendered
      log.warn('PrivilegeChecker - privileges are being loaded, returning true for now');
      return true;
    }

    if (! ApiResponseHelper.hasSucceeded(privileges)) {
      log.error('PrivilegeChecker - privileges were not fetched successfully');
      return false;
    }

    const regEx = new RegExp(`${privilege}$`, 'i');
    return !! privileges.data.items.find((item) => regEx.test(item));
  }
}
