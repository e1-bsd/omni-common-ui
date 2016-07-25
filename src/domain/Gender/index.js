import is from 'is_js';

export const MALE = 'male';
export const FEMALE = 'female';
export const UNKNOWN = 'unknown';

export const isMale = (gender) => {
  if (is.not.string(gender)) {
    return false;
  }

  return gender.toLowerCase() === MALE;
};

export const isFemale = (gender) => {
  if (is.not.string(gender)) {
    return false;
  }

  return gender.toLowerCase() === FEMALE;
};

export const isUnknown = (gender) => {
  if (is.not.string(gender)) {
    return false;
  }

  return gender.toLowerCase() === UNKNOWN;
};

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
