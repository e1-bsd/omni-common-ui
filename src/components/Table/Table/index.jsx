import styles from './style.postcss';

import React from 'react';
import Header from '../Header';
import Body from '../Body';
import is from 'is_js';

const Table = (props) => {
  const hasHeader = is.function(props.header);

  return <table className={styles.Table}>
    {renderHeader()}
    <Body>
      {props.children}
    </Body>
  </table>;

  function renderHeader() {
    if (!hasHeader) {
      return;
    }

    return <Header>{props.header()}</Header>;
  }
};

Table.propTypes = {
  header: React.PropTypes.func,
};

export default Table;
