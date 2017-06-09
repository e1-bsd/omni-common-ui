import { Map } from 'immutable';

class MapMock {
  constructor() {
    this._realMap = new Map();
  }
}

const methods = Object.getOwnPropertyNames(Map.prototype);
methods.forEach((method) => {
  if (/(^[^a-z])|(contructor)/.test(method)) return;

  MapMock.prototype[method] = function (...args) { // eslint-disable-line func-names
    const result = this._realMap[method](...args);
    if (Map.isMap(result)) {
      this._realMap = result;
      return this;
    }

    return result;
  };
});

module.exports = new MapMock();
