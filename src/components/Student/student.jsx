import React from 'react';
import styles from './style.postcss';
import classnames from 'classnames';

const Student = (props) => {
  const { src } = props;
  const classes = props.disabled ? classnames(styles.Student, styles.__disabled) : styles.Student;
  return <div>
    <img src={src} role="presentation" className={classes}>
    </img>
    {renderInfo(props.name, props.middleName, props.surname)}
  </div>;
  function renderInfo(name, middleName, surname) {
    return <ul>
      {name ? <li>{name}</li> : ''}
      {middleName ? <li>{middleName}</li> : ''}
      {surname ? <li>{surname}</li> : ''}
    </ul>;
  }
};

Student.propTypes = {
  disabled: React.PropTypes.bool,
  middleName: React.PropTypes.string,
  name: React.PropTypes.string,
  src: React.PropTypes.string,
  surname: React.PropTypes.string,
};

export default Student;
