import values from 'object.values';
import entries from 'object.entries';

const bindPolyfills = () => {
  if (! Object.values) {
    values.shim();
  }

  if (! Object.entries) {
    entries.shim();
  }
};

export default bindPolyfills;
