import is from 'is_js';

let set = false;
let map;

class ErrorMessage {
  static for(key) {
    if (is.not.object(map)) {
      return undefined;
    }

    return map[key];
  }

  static getMap() {
    return map;
  }

  static setMap(newMap) {
    if (set !== false) {
      throw new Error('ErrorMessage map has already been set!');
    }

    set = true;

    if (is.object(newMap)) {
      map = Object.freeze(Object.assign({}, newMap));
    }
  }
}

export default ErrorMessage;
