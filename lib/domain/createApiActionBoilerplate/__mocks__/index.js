"use strict";

module.exports = function (requestActionType, successActionType, failureActionType) {
  return function (fullUrl, method) {
    return {
      requestActionType: requestActionType,
      successActionType: successActionType,
      failureActionType: failureActionType,
      fullUrl: fullUrl,
      method: method
    };
  };
};
//# sourceMappingURL=index.js.map
