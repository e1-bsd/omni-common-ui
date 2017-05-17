#!/usr/bin/env node
/* eslint-disable no-console */

const execOrExit = require('./execOrExit');

execOrExit('yarn run clean:dists');
execOrExit('yarn run lint:css');
execOrExit('yarn run lint:js');
execOrExit('yarn run test:once');
execOrExit('yarn build');
