export const MALE = 0;
export const FEMALE = 1;
export const UNKNOWN = null;

export const isMale = (gender) => gender === MALE;
export const isFemale = (gender) => gender === FEMALE;
export const isUnknown = (gender) => gender === UNKNOWN;

export const Gender = { MALE, FEMALE, UNKNOWN, isMale, isFemale, isUnknown };

export default Gender;
