import styles from './style.postcss';

import classnames from 'classnames';

export const Type = {
  neo: classnames(styles.NeoButton, styles.NeoButton_default),
  neoInverse: classnames(styles.NeoButton, styles.NeoButton_inverse),
  neoPrimary: classnames(styles.NeoButton, styles.NeoButton_primary),
  neoPrimaryInverse: classnames(styles.NeoButton, styles.NeoButton_primaryInverse),
  default: classnames(styles.Button, styles.Button_default),
  primary: classnames(styles.Button, styles.Button_primary),
  defaultInverse: classnames(styles.Button, styles.Button_defaultInverse),
  primaryInverse: classnames(styles.Button, styles.Button_primaryInverse),
};

// `neoSecondary` is the long form of `neo`
Type.neoSecondary = Type.neo;

export const NeoTypes = [
  Type.neoSecondary, Type.neoPrimary, Type.neoPrimaryInverse,
];

export function validateType(type) {
  if (Object.keys(Type).some((k) => Type[k] === type)) {
    return true;
  }
  throw new Error(`Type "${type}" is not valid! Use the Type object provided`);
}
