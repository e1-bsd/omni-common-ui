import styles from './style.postcss';
import React, { PureComponent } from 'react';
import ContentEditable from 'components/ContentEditable';
import Previewer from './Previewer';
import Editor from './Editor';

class SelectionTooltip extends PureComponent {

  constructor() {
    super();
    this.state = {
      content: undefined,
      selection: undefined,
    };
    this._onChange = this._onChange.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
  }

  _onMouseUp() {
    const selection = window.getSelection() && window.getSelection().toString();
    this.setState({
      selection,
    });
  }

  _onChange(content) {
    this.setState({
      content
    });
  }


  render() {
    return <div className={styles.SelectionTooltip}>
      <ContentEditable className={styles.SelectionTooltip_input}
          onChange={this._onChange}
          onMouseUp={this._onMouseUp} />
      <Editor selection={this.state.selection} />
      <Previewer text={this.state.content} />
    </div>;
  }
}

export default SelectionTooltip;

