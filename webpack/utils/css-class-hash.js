const getLocalIdent = require('css-loader/lib/getLocalIdent');

module.exports = ({ prefix = '' }) => (loaderContext, localIdentName, localName, options) =>
    getLocalIdent(loaderContext, localIdentName, `${prefix}${localName}`, options);
