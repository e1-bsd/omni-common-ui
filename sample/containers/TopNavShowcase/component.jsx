import styles from './style.postcss';

import React, { Component } from 'react';
import { TopNav } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import logoImage from './ef-logo.png';
import searchImage from './search-icon.png';
import editImage from './edit-icon.png';
import { mediaQuery } from 'domain/MediaQuery';

class TopNavShowcase extends Component {

  constructor(props) {
    super(props);
    this.xsQuery = mediaQuery('(min-width: 20em)');
    this.smQuery = mediaQuery('(min-width: 3oem)');
    this.mdQuery = mediaQuery('(min-width: 40em)');
    this.state = {
      xs: this.xsQuery.matches ? false : true,
      sm: this.smQuery.matches ? false : true,
      md: this.mdQuery.matches ? false : true,
    };
  }

  componentDidMount() {
    this.xsQuery.addListener((mql) => {
      if (mql.matches) {
        this.setState({ xs: false });
      } else {
        this.setState({ xs: true });
      }
    });
    this.smQuery.addListener((mql) => {
      if (mql.matches) {
        this.setState({ sm: false });
      } else {
        this.setState({ sm: true });
      }
    });
    this.mdQuery.addListener((mql) => {
      if (mql.matches) {
        this.setState({ md: false });
      } else {
        this.setState({ md: true });
      }
    });
  }

  renderLogo() {
    if (!this.state.md) {
      return <TopNav.Logo src={logoImage}></TopNav.Logo>;
    } else {
      return <span className={styles.TopNavShowcase_sideBar}></span>;
    }
  }

  render() {
    return <Showcase title="TopNav" titleLink="topnav">
      <TopNav>
        {this.renderLogo()}
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
