import is from 'is_js';
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

const REQUIRED_ARGS_COUNT = 3;

const createApiActionCreator = (actionObjectName,
    url, method = 'GET',
    requestExtras = {}, successExtras = {}, failureExtras = {}) =>  // these are optional!

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
        type, url, method, payload: fetch(url), ...requestExtras,
      });
    }

    function createFetchSuccessAction(response) {
      const type = `${prefix}${upperActionObjectName}_SUCCESS`;
      return ApiCall.createAction({
        type, url, method, payload: response, ...successExtras,
      });
    }

    function createFetchFailureAction(error) {
      const type = `${prefix}${upperActionObjectName}_FAILURE`;
      return ApiCall.createAction({
        type, url, method, error, ...failureExtras,
      });
    }
  };

const curried = (...args) => {
  if (args.length >= REQUIRED_ARGS_COUNT) {
    return createApiActionCreator.apply(this, args);
  }
  if (args.length === 1 && is.object(args[0])) {  // allow first arg to be an options hash
    const options = args[0];
    return createApiActionCreator.call(this,
        options.actionObjectName,
        options.url,
        options.method,
        options.requestExtras,
        options.successExtras,
        options.failureExtras);
  }
  return (...rest) =>
    curried.apply(this, args.concat(rest));
};

export default curried;
