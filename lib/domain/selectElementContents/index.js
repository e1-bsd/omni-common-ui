"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var selectElementContents = exports.selectElementContents = function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  return el;
};

exports.default = selectElementContents;
//# sourceMappingURL=index.js.map
