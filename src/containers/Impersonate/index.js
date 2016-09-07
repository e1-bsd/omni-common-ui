import _Impersonate from './component';
import {
  postedImpersonate as _postedImpersonate,
  unimpersonate as _unimpersonate,
} from './reducer';
import { unimpersonate as _unimpersonateRequest } from './actions';

const Impersonate = _Impersonate;

export const postedImpersonate = _postedImpersonate;
export const unimpersonate = _unimpersonate;
export const unimpersonateRequest = _unimpersonateRequest;

export default Impersonate;
