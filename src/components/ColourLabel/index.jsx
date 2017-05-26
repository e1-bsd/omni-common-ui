import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import is from 'is_js';
import Tooltip from 'components/Tooltip';
import PropTypes from 'prop-types';

const ColourLabel = (props) => {
  const { text, initial, colour } = props;

  if (is.string(initial) && is.not.empty(initial)) {
    return renderSmall();
  }

  if (is.string(text) && is.not.empty(text)) {
    return renderBig();
  }

  return null;

  function renderSmall() {
    if (is.string(text) && is.not.empty(text)) {
      return <Tooltip text={text} className={styles.ColourLabel}>
        <div className={classnames(styles.ColourLabel_inner, styles.__small)}
            style={{ backgroundColor: colour }}>
          {initial}
        </div>
      </Tooltip>;
    }

    return <div className={styles.ColourLabel}>
      <div className={classnames(styles.ColourLabel_inner, styles.__small)}
          style={{ backgroundColor: colour }}>
        {initial}
      </div>
    </div>;
  }

  function renderBig() {
    return <div className={styles.ColourLabel}>
      <div className={styles.ColourLabel_inner} style={{ backgroundColor: colour }}>{text}</div>
    </div>;
  }
};

ColourLabel.propTypes = {
  initial: PropTypes.string,
  text: PropTypes.string,
  colour: PropTypes.string,
};

export default pure(ColourLabel);
