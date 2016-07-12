import _StudentCard from './StudentCard';
import _Content from './Content';
import _Profile from './Profile';

export const StudentCard = _StudentCard;
export const Content = _Content;
export const Profile = _Profile;

StudentCard.Content = Content;
StudentCard.Profile = Profile;

export default StudentCard;
