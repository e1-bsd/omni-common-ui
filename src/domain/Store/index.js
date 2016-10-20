let store = null;

const Store = {
  get: () => store,
  set: (newStore) => {
    if (store !== null) {
      throw new Error('Store has already been set!');
    }

    store = newStore;
  },
};

if (TEST) {
  Store.Test = {
    set: (newStore) => {
      store = newStore;
    },
    clear: () => {
      if (! TEST) {
        throw Error('Store.clear() can only be used in tests!');
      }

      store = null;
    },
  };
}

export default Store;
