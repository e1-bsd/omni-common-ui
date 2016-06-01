import React from 'react';
import styles from './style.postcss';
import classnames from 'classnames';

const Student = (props) => {
  const { src } = props;
  const classes = props.disabled ? classnames(styles.Student, styles.__disabled) : styles.Student;
  return <div>
    <img src={src} role="presentation" className={classes}>
    </img>
  </div>;
};

Student.propTypes = {
  src: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

export default Student;
