import {
  FETCH_PRIVILEGES_REQUEST,
  FETCH_PRIVILEGES_SUCCESS,
  FETCH_PRIVILEGES_FAILURE,
  FETCH_PRIVILEGES_INVALIDATE,
} from './actions';
import Privileges from './model';

export default function privileges(state = Privileges.create(), action) {
  switch (action.type) {
    case FETCH_PRIVILEGES_SUCCESS:
      return Privileges.create({ items: action.privileges });
    case FETCH_PRIVILEGES_INVALIDATE:
      return Privileges.create({ items: state.items, didInvalidate: true });
    case FETCH_PRIVILEGES_REQUEST:
    case FETCH_PRIVILEGES_FAILURE:
      return Privileges.create(); // Removes the data.
    default:
      return state;
  }
}
