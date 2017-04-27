import React, { Component } from 'react';
import Showcase from 'components/Showcase';
import { HorizontalSelect } from 'omni-common-ui';

class HorizontalSelectShowcase extends Component {

  _onSelect(value) {
    this.setState({
      selection: value,
    });
  }

  render() {
    const options = [...Array(10).keys()].map(
      (index) => {
        const option = {
          html: <div>{`hello ${index}`}</div>,
          value: `hello ${index}`,
        };
        return option;
      }
    );

    const selectionText = `Your selection is ${this.state && this.state.selection}`;
    return <Showcase title="Horizontal Select" titleLink="horizontalSelect">
      <HorizontalSelect options={options} onSelect={(value) => this._onSelect(value)} />
      <div>{selectionText}</div>
    </Showcase>;
  }
}

export default HorizontalSelectShowcase;
