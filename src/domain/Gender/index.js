import is from 'is_js';

const MALE = 'male';
const FEMALE = 'female';
const UNKNOWN = null;

class Gender {
  static isMale(gender) {
    if (is.not.string(gender)) {
      return false;
    }

    return /^m(ale)?$/i.test(gender);
  }

  static isFemale(gender) {
    if (is.not.string(gender)) {
      return false;
    }

    return /^f(emale)?$/i.test(gender);
  }

  static isUnknown(gender) {
    return ! Gender.isMale(gender) && ! Gender.isFemale(gender);
  }

  static parse(gender) {
    if (Gender.isMale(gender)) {
      return MALE;
    }

    if (Gender.isFemale(gender)) {
      return FEMALE;
    }

    return UNKNOWN;
  }
}

export default Gender;
