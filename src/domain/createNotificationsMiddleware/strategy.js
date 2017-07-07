import is from 'is_js';
import invariant from 'invariant';
import EventEmitter from 'event-emitter';

export class Strategy extends EventEmitter {
  constructor(config) {
    super();
    invariant(is.object(config), 'config must be an object');
    this._config = config;
    if (! is.number(config.triggerOnStartAfterMs)) return;
    window.setTimeout(() => {
      this.emit('notification');
    }, config.triggerOnStartAfterMs);
  }
}

export default Strategy;
