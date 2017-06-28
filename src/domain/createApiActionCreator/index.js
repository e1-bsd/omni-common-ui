import { fetch } from 'domain/Api';
import ApiCall from 'containers/ApiCalls';

/*
 * Supports currying so that args can be recycled more conveniently.
 * A contrived example:
 * ```
 * const createCreatorForX = createApiActionCreator('NOTIFICATION', 'http://...');
 * const getXActionCreator = createCreatorForX('GET');
 * const postXActionCreator = createCreatorForX('POST');
 * ```
 */

const createApiActionCreator = (actionObjectName, url, method = 'GET') =>
  (dispatch) => {
    const prefix = (() => {
      switch (method.toUpperCase()) {
        case 'DELETE': return 'DELETE_';
        case 'POST': case 'PUT': return 'SUBMIT_';
        case 'GET': default: return 'FETCH_';
      }
    })();

    const upperActionObjectName = actionObjectName.toUpperCase();

    return dispatch(createFetchRequestAction()).payload
      .then((response) => dispatch(createFetchSuccessAction(response)))
      .catch((error) => dispatch(createFetchFailureAction(error)));

    function createFetchRequestAction() {
      const type = `${prefix}${upperActionObjectName}_REQUEST`;
      return ApiCall.createAction({
        type, url, method, payload: fetch(url),
      });
    }

    function createFetchSuccessAction(response) {
      const type = `${prefix}${upperActionObjectName}_SUCCESS`;
      return ApiCall.createAction({
        type, url, method, payload: response,
      });
    }

    function createFetchFailureAction(error) {
      const type = `${prefix}${upperActionObjectName}_FAILURE`;
      return ApiCall.createAction({
        type, url, method, error,
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
