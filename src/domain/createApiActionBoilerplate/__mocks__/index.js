module.exports = (requestActionType, successActionType, failureActionType) =>
  (fullUrl, method) => ({
    requestActionType,
    successActionType,
    failureActionType,
    fullUrl,
    method,
  });
