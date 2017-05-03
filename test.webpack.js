import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import bindPolyfills from 'domain/Polyfills';
import 'babel-polyfill';

bindPolyfills();

chai.use(chaiEnzyme());

const appDirTests = require.context('./src', true, /\.jsx?$/);
appDirTests.keys().forEach(appDirTests);
