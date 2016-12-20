import React, { Component } from 'react';
import { Dialog, Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';

class DialogShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      isDialogLoading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isDialogLoading === this.state.isDialogLoading ||
        ! this.state.isDialogLoading) {
      return;
    }
    setTimeout(() => {
      this.setState({ isDialogLoading: false });
    }, 2000);
  }

  render() {
    return <Showcase title="Dialogs" titleLink="dialogs">
      {/* Dialog Trigger */}
      <Button type={Button.Type.neoPrimary}
          onClick={() =>
            this.setState({ isDialogOpen: ! this.state.isDialogOpen })}>
        Show dialog
      </Button>

      {/* Dialog Component */}
      <Dialog isOpen={this.state.isDialogOpen}
          isLoading={this.state.isDialogLoading}
          onRequestClose={() => this.setState({ isDialogOpen: false })}>
        <h1>Dialog Title</h1>
        <p>Dialog Content</p>
        <Button type={Button.Type.neo}
            onClick={() =>
              this.setState({ isDialogLoading: true })}>
          Do something
        </Button>
      </Dialog>
    </Showcase>;
  }
}

export default DialogShowcase;
