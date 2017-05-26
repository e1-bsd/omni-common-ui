import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import is from 'is_js';
import PropTypes from 'prop-types';

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
  boardTitle: PropTypes.string.isRequired,
  boardValue: PropTypes.string.isRequired,
};

export default pure(Detailsboard);
