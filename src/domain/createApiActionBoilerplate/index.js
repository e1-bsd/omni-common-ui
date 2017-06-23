import { fetch } from 'domain/Api';
import ApiCall from 'containers/ApiCalls';

export function createApiActionBoilerplate(
    requestActionType, successActionType, failureActionType) {
  return function actionCreator(url, method = 'GET') {
    return (dispatch) => {
      return dispatch(fetchNotificationsRequest()).payload
        .then((response) => dispatch(fetchNotificationsSuccess(response)))
        .catch((error) => dispatch(fetchNotificationsFailure(error)));

      function fetchNotificationsRequest() {
        return ApiCall.createAction({
          type: requestActionType,
          payload: fetch(url),
          url,
          method,
        });
      }

      function fetchNotificationsSuccess(response) {
        return ApiCall.createAction({
          type: successActionType,
          payload: response,
          url,
          method,
        });
      }

      function fetchNotificationsFailure(error) {
        return ApiCall.createAction({
          type: failureActionType,
          error,
          url,
          method,
        });
      }
    };
  };
}

export default createApiActionBoilerplate;
