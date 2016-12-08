export default class GlobalTimer {
  constructor() {
    this._timerHandler = undefined;
  }

  invoke(callback, duration) {
    this.cancel();
    this._timerHandler = setTimeout(callback, duration);
  }

  cancel() {
    if (this._timerHandler) {
      clearTimeout(this._timerHandler);
      this._timerHandler = undefined;
    }
  }
}
