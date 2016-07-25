import React, { Component } from 'react';
import { Dialog, Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';

class DialogShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  render() {
    return <Showcase title="Dialogs" titleLink="dialogs">
      <Button onClick={() => this.setState({ isOpen: ! this.state.isOpen })}>Show dialog</Button>
      <Dialog isOpen={this.state.isOpen}
          onRequestClose={() => this.setState({ isOpen: false })}>
        <p>Dialog content</p>
      </Dialog>
    </Showcase>;
  }
}

export default DialogShowcase;
