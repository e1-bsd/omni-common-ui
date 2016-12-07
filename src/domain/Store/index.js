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

export default Store;
