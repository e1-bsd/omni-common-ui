import React, { Component } from 'react';
import { Dialog } from 'omni-common-ui';
import Showcase from 'components/Showcase';

class DialogShowcase extends Component {
  render() {
    return <Showcase title="Dialogs">
      <Dialog />
    </Showcase>;
  }
}

export default DialogShowcase;
