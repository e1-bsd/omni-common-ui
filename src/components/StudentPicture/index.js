import _StudentPicture from './component';
import _Gender from 'domain/Gender';

export const StudentPicture = _StudentPicture;
export const Gender = _Gender;

StudentPicture.Gender = Gender;

export default StudentPicture;
