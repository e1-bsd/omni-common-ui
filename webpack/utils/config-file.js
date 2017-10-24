const path = require('path');

module.exports = path.resolve(`config/${process.env.CONFIG || process.env.NODE_ENV || 'development'}.json`);
