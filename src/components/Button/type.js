import styles from './style.postcss';

export const Type = {
  default: styles.__default,
  primary: styles.__primary,
};

export function validateType(type) {
  if (type === Type.default) {
    return true;
  }

  if (type === Type.primary) {
    return true;
  }

  throw `Type "${type}" is not valid! Use the Type object provided`;
}
