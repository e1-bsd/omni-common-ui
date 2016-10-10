import {
  FETCH_PRIVILEGES_REQUEST,
  FETCH_PRIVILEGES_SUCCESS,
  FETCH_PRIVILEGES_FAILURE,
  FETCH_PRIVILEGES_INVALIDATE,
} from './actions';
import { ApiResponse } from 'domain/ApiResponse';
import { ApiResponseHelper } from 'domain/ApiResponseHelper';
import Privileges from './model';

export default function privileges(state = new ApiResponse(), action) {
  switch (action.type) {
    case FETCH_PRIVILEGES_REQUEST:
      return ApiResponseHelper.create({ loading: true });
    case FETCH_PRIVILEGES_SUCCESS:
      return Privileges.create({ items: action.privileges });
    case FETCH_PRIVILEGES_FAILURE:
      return ApiResponseHelper.create(new Error(action.error));
    case FETCH_PRIVILEGES_INVALIDATE:
      return state.update('data', (data) => data.set('didInvalidate', true));
    default:
      return state;
  }
}
