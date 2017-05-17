import styles from './style.postcss';

import React, { Component } from 'react';
import Showcase from 'components/Showcase';
import { HorizontalSelect, StudentCard } from 'omni-common-ui';

class HorizontalSelectShowcase extends Component {

  _onSelect(value) {
    this.setState({
      selection: value,
    });
  }

  _getOptionHtml(index) {
    const className = styles.HorizontalSelectShowcase_options;
    return <StudentCard vertical borderless backgroundless className={className}>
      <StudentCard.Profile name="Hello"
          surname={index}
          localName="王呆呆"
          gender="male" />
    </StudentCard>;
  }

  render() {
    const options = [...Array(10).keys()].map(
      (index) => {
        const option = {
          html: this._getOptionHtml(index),
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
