let store = null;

export default {
  get: () => store,
  set: (newStore) => {
    if (store !== null) {
      throw new Error('Store has already been set!');
    }

    store = newStore;
  },
};
