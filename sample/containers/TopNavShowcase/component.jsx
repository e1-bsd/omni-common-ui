import React, { Component } from 'react';
import { TopNav } from 'omni-common-ui';
import Showcase from 'components/Showcase';

class TopNavShowcase extends Component {
  render() {
    return <Showcase title="TopNav" titleLink="topnav">
      <TopNav/>
    </Showcase>;
  }
}

export default TopNavShowcase;
