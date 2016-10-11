import { setupApp } from 'omni-common-ui';
import routes from './routes';
import reducer from './rootReducer';

setupApp(routes, reducer);
