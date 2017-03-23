import values from 'object.values';
import entries from 'object.entries';
import './Sticky';

const bindPolyfills = () => {
  if (! Object.values) {
    values.shim();
  }

  if (! Object.entries) {
    entries.shim();
  }
};

export default bindPolyfills;
