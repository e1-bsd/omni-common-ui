import React from 'react';
import styles from './style.postcss';
import classnames from 'classnames';

const Student = (props) => {
  const { src } = props;
  const classes = classnames(styles.Student, { [styles.__disabled]: props.disabled });
  return <div className={classes}>
    {renderImage(src)}
    {renderInfo(props.name, props.middleName, props.surname)}
  </div>;
  function renderImage(srcPath) {
    return <img src={srcPath} className={styles.Student_image} role="presentation"></img>;
  }
  function renderInfo(name, middleName, surname) {
    return <ul className={styles.Student_info}>
      {name ? <li className={classnames({ 'test-student-name': TEST })}>{name}</li> : ''}
      {middleName ?
        <li className={classnames({ 'test-student-middleName': TEST })}>
          {middleName}
        </li> : ''}
      {surname ? <li className={classnames({ 'test-student-surname': TEST })}>{surname}</li> : ''}
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
