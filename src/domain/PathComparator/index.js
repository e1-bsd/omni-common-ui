export default class PathComparator {
  static equal(a, b) {
    // eslint-disable-next-line no-param-reassign
    a = a.replace(/^\//, '').replace(/\/$/, '');
    return new RegExp(`^/?${a}/?$`, 'i').test(b);
  }
}
