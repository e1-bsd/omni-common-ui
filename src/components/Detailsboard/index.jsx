import styles from './style.postcss';
import React from 'react';
import classnames from 'classnames';
import is from 'is_js';

const Detailsboard = (props) => {
  const classesBoard = classnames(styles.Detailsboard_board);
  const classesH5 = classnames(styles.Detailsboard_h5);
  const classesP = classnames(styles.Detailsboard_p);

  return <div className={classesBoard}>
    <h5 className={classesH5}>{props.boardTitle}</h5>
    <p className={classesP}>{judgeValue(props.boardValue)}</p>
  </div>;

  function judgeValue(boardValue) {
    if (! is.not.undefined(boardValue) || ! boardValue || boardValue === '') {
      return '_';
    }
    return boardValue;
  }
};

Detailsboard.propTypes = {
  boardTitle: React.PropTypes.string.isRequired,
  boardValue: React.PropTypes.string.isRequired,
};

export default Detailsboard;
