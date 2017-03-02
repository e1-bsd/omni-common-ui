import styles from './style.postcss';

import classnames from 'classnames';

export const Type = {
  default: classnames(styles.Button, styles.Button_default),
  defaultInverse: classnames(styles.Button, styles.Button_inverse),
  primary: classnames(styles.Button, styles.Button_primary),
  primaryInverse: classnames(styles.Button, styles.Button_primaryInverse),
};

export function validateType(type) {
  if (Object.keys(Type).some((k) => Type[k] === type)) {
    return true;
  }
  throw new Error(`Type "${type}" is not valid! Use the Type object provided`);
}
