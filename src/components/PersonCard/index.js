import _PersonCard from './PersonCard';
import _Content from './Content';
import _Profile from './Profile';

export const PersonCard = _PersonCard;
export const Content = _Content;
export const Profile = _Profile;

PersonCard.Content = Content;
PersonCard.Profile = Profile;

export default PersonCard;
