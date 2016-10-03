import styles from './style.postcss';

export const Type = {
  default: styles.__default,
  primary: styles.__primary,
  primaryInverse: styles.__primaryInverse,
};

export function validateType(type) {
  if (type === Type.default) {
    return true;
  }

  if (type === Type.primary) {
    return true;
  }

  if (type === Type.primaryInverse) {
    return true;
  }

  throw new Error(`Type "${type}" is not valid! Use the Type object provided`);
}
