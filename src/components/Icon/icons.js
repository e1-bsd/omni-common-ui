import path from 'path';
import { Map } from 'immutable';

const requiredIcons = require.context('.', false, /\.svg$/);
export default requiredIcons.keys().reduce(
  (map, key) => map.set(
    key.match(new RegExp(`.\\${path.sep}(.+)\\.svg$`))[1],
    requiredIcons(key)
  ),
  new Map()
);
