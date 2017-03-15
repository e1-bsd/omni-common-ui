import is from 'is_js';

export const MALE = 'male';
export const FEMALE = 'female';
export const UNKNOWN = null;

export const isMale = (gender) => {
  if (is.not.string(gender)) {
    return false;
  }

  return /^m(ale)?$/i.test(gender);
};

export const isFemale = (gender) => {
  if (is.not.string(gender)) {
    return false;
  }

  return /^f(emale)?$/i.test(gender);
};

export const isUnknown = (gender) => ! isMale(gender) && ! isFemale(gender);

export const parse = (gender) => {
  if (isMale(gender)) {
    return MALE;
  }

  if (isFemale(gender)) {
    return FEMALE;
  }

  return UNKNOWN;
};

export const Gender = { MALE, FEMALE, UNKNOWN, isMale, isFemale, isUnknown, parse };

export default Gender;
