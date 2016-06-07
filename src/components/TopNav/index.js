import _TopNav from './TopNav';
import _Logo from './Logo';
import _Profile from './Profile';
import _MainContent from './MainContent';
import _MenuGroup from './MenuGroup';

export const TopNav = _TopNav;
export const Logo = _Logo;
export const Profile = _Profile;
export const MainContent = _MainContent;
export const MenuGroup = _MenuGroup;

TopNav.Logo = Logo;
TopNav.Profile = Profile;
TopNav.MainContent = MainContent;
TopNav.MenuGroup = MenuGroup;

export default TopNav;
