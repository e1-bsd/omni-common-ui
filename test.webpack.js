import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

const appDirTests = require.context('./src', true, /\.?spec\.jsx?$/);
appDirTests.keys().forEach(appDirTests);
