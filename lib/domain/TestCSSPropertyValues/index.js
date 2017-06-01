'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable */

// stolen from http://albertogasparin.it/articles/2014/04/detect-css-support-of-property-value

var testPropertyValues = function testPropertyValues(property, values) {
  var prop = property + ':',
      el = document.createElement('test'),
      mStyle = el.style,
      index;

  for (var i = 0; i < values.length; i++) {
    mStyle.cssText = prop + values.join(';' + prop) + ';';
  }

  return mStyle[property];
};

exports.default = testPropertyValues;
//# sourceMappingURL=index.js.map
