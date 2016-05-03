import { combineReducers } from 'redux-immutable';
import routerReducer from './routerReducer';

export default combineReducers({
  rootReducer: combineReducers({}),
  routing: routerReducer,
});
