import React, { Component } from 'react';
import { TopNav } from 'omni-common-ui';
import Showcase from 'components/Showcase';
import logoImage from './ef-logo.png';

class TopNavShowcase extends Component {
  render() {
    return <Showcase title="TopNav" titleLink="topnav">
      <TopNav>
        <TopNav.Logo src={logoImage}></TopNav.Logo>
      </TopNav>
    </Showcase>;
  }
}

export default TopNavShowcase;
