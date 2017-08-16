const crypto = require('crypto');

module.exports = ({ prefix = '', keepOriginalName = false }) => (context, localIdentName, localName) => {
  const className = `${prefix}${localName}`;
  const hash = crypto.createHash('md5').update(className).digest('hex');
  if (! keepOriginalName) return `_${hash}`;
  return `_${className}--${hash.substring(0, 5)}`;
};
