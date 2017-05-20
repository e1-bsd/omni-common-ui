'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var store = null;

var Store = {
  get: function get() {
    return store;
  },
  set: function set(newStore) {
    if (store !== null) {
      throw new Error('Store has already been set!');
    }

    store = newStore;
  }
};

exports.default = Store;
//# sourceMappingURL=index.js.map
