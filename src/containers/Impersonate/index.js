import _Impersonate from './component';
import _reducer from './reducer';
import { unimpersonate as _unimpersonateRequest } from './actions';

const Impersonate = _Impersonate;

export const reducer = _reducer;
export const unimpersonateRequest = _unimpersonateRequest;

export default Impersonate;
