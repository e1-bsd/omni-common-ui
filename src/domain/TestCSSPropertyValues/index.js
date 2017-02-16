/* eslint-disable */

// stolen from http://albertogasparin.it/articles/2014/04/detect-css-support-of-property-value

const testPropertyValues = (property, values) => {
  var prop = property + ':',
    el = document.createElement('test'),
    mStyle = el.style, index;

  for (var i = 0; i < values.length; i++) {
    mStyle.cssText = prop + values.join(';' + prop) + ';';
  }

  return mStyle[property];
};

export default testPropertyValues;
