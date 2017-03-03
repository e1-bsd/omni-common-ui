import styles from './style.postcss';

import classnames from 'classnames';

export const Type = {
  default: classnames(styles.Button, styles.__default),
  defaultInverse: classnames(styles.Button, styles.__default, styles.__inverse),
  primary: classnames(styles.Button, styles.__primary),
  primaryInverse: classnames(styles.Button, styles.__primary, styles.__inverse),
  correct: classnames(styles.Button, styles.__correct),
  wrong: classnames(styles.Button, styles.__wrong),
  needsAttention: classnames(styles.Button, styles.__needsAttention),
  black: classnames(styles.Button, styles.__black),
};

export function validateType(type) {
  if (Object.keys(Type).some((k) => Type[k] === type)) {
    return true;
  }
  throw new Error(`Type "${type}" is not valid! Use the Type object provided`);
}
