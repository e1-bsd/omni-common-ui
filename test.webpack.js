import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import bindPolyfills from 'domain/Polyfills';

bindPolyfills();

chai.use(chaiEnzyme());

const appDirTests = require.context('./src', true, /\.?spec\.jsx?$/);
appDirTests.keys().forEach(appDirTests);
