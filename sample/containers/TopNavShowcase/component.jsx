import styles from './style.postcss';

import React, { Component } from 'react';
import { TopNav } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import logoImage from './ef-logo.png';
import searchImage from './search-icon.png';
import editImage from './edit-icon.png';

class TopNavShowcase extends Component {

  render() {
    return <Showcase title="TopNav" titleLink="topnav">
      <TopNav>
        <TopNav.Logo src={logoImage}></TopNav.Logo>
        <TopNav.MainContent/>
        <TopNav.MenuGroup>
          <img src={searchImage}></img>
          <img src={editImage}></img>
          <span className={styles.TopNavShowcase_menuGroup_moreItems}></span>
        </TopNav.MenuGroup>
        <TopNav.Profile/>
      </TopNav>
    </Showcase>;
  }
}

export default TopNavShowcase;
