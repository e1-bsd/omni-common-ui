import { fetch } from 'domain/Api';
import ApiCall from 'containers/ApiCalls';

/*
 * Supports currying so that args can be recycled more conveniently.
 * A contrived example:
 * ```
 * const createCreatorForX =
 *    createApiActionCreator('X_REQUEST', 'X_SUCCESS', 'X_FAILURE', 'http://...');
 * const getXActionCreator = createCreatorForX('GET');
 * const postXActionCreator = createCreatorForX('POST');
 * ```
 */

const createApiActionCreator = (
    requestActionType, successActionType, failureActionType, url, method) =>
  (dispatch) => {
    return dispatch(createFetchRequestAction()).payload
      .then((response) => dispatch(createFetchSuccessAction(response)))
      .catch((error) => dispatch(createFetchFailureAction(error)));

    function createFetchRequestAction() {
      return ApiCall.createAction({
        type: requestActionType,
        payload: fetch(url),
        url,
        method,
      });
    }

    function createFetchSuccessAction(response) {
      return ApiCall.createAction({
        type: successActionType,
        payload: response,
        url,
        method,
      });
    }

    function createFetchFailureAction(error) {
      return ApiCall.createAction({
        type: failureActionType,
        error,
        url,
        method,
      });
    }
  };

const curried = (...args) => {
  if (args.length >= createApiActionCreator.length) {
    return createApiActionCreator.apply(this, args);
  }
  return (...rest) => curried.apply(this, args.concat(rest));
};

export default curried;
