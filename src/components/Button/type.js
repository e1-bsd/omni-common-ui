import styles from './style.postcss';

export const Type = {
  default: styles.__default,
  danger: styles.__danger,
};

export function validateType(type) {
  if (type === Type.default) {
    return true;
  }

  if (type === Type.danger) {
    return true;
  }

  throw `Type "${type}" is not valid! Use the Type object provided`;
}
