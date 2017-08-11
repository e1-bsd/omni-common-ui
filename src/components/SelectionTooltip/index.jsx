import styles from './style.postcss';
import React, { PureComponent } from 'react';
import ContentEditable from 'components/ContentEditable';

class SelectionTooltip extends PureComponent {

  componentDidMount() {
  }

  render() {
    return <div className={styles.SelectionTooltip}>
      <ContentEditable className={styles.SelectionTooltip_input} />
      <span className={styles.SelectionTooltip_note}>
        Hello, SelectionTooltip
      </span>
    </div>;
  }
}

export default SelectionTooltip;

