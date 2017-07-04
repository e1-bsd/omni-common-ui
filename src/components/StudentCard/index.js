import _StudentCard from './StudentCard';
import _Content from './Content';
import _Profile from './Profile';
import _Person from './Person';

export const StudentCard = _StudentCard;
export const Content = _Content;
export const Profile = _Profile;
export const Person = _Person;

StudentCard.Content = Content;
StudentCard.Profile = Profile;
StudentCard.Person = Person;

export default StudentCard;
