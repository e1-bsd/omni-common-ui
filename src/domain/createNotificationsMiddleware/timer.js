import is from 'is_js';
import Strategy from './strategy';

export class TimerStrategy extends Strategy {
  constructor(config) {
    super(config);
    if (! is.number(config.intervalMs)) return;
    window.setInterval(() => {
      this.emit('notification');
    }, config.intervalMs);
  }
}

export default TimerStrategy;
