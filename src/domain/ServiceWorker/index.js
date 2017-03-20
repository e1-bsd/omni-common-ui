import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate';
import log from 'domain/log';

export default class ServiceWorker {
  static register() {
    if ('serviceWorker' in navigator &&
        (window.location.protocol === 'https:' || window.location.hostname === 'localhost')
    ) {
      const registration = runtime.register();

      registerEvents(registration, {
        onInstalled: () => log.debug('ServiceWorker - onInstalled'),
        onUpdateReady: () => log.debug('ServiceWorker - onUpdateReady'),
        onUpdating: () => log.debug('ServiceWorker - onUpdating'),
        onUpdateFailed: () => log.debug('ServiceWorker - onUpdateFailed'),
        onUpdated: () => log.debug('ServiceWorker - onUpdated'),
      });
    } else {
      log.warn('ServiceWorker - Not available');
    }
  }

  static update() {
    applyUpdate().then(() => {
      window.location.reload();
    });
  }
}
