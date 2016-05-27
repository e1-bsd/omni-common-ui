import styles from './style.postcss';

import React from 'react';
import { TopNav } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import logoImage from './ef-logo.png';
import searchImage from './search-icon.png';
import editImage from './edit-icon.png';

const TopNavShowcase = () => <Showcase title="TopNav" titleLink="topnav">
  <TopNav>
    <TopNav.Logo src={logoImage} />
    <TopNav.MainContent />
    <TopNav.MenuGroup>
      <img src={searchImage} role="presentation" />
      <img src={editImage} role="presentation" />
      <span className={styles.TopNavShowcase_menuGroup_moreItems} />
    </TopNav.MenuGroup>
    <TopNav.Profile />
  </TopNav>
</Showcase>;

export default TopNavShowcase;
