import React from 'react';
import styles from './style.postcss';
import classnames from 'classnames';

const Student = (props) => {
  const classes = classnames(styles.Student, { [styles.__disabled]: props.disabled });

  return <div className={classes}>
    {renderImage()}
    {renderInfo()}
  </div>;

  function renderImage() {
    return <img src={props.src}
        className={styles.Student_image}
        role="presentation"
        onClick={() => props.onStudentClick()} />;
  }

  function renderInfo() {
    return <div className={styles.Student_info}>
      {renderName(props.name, classnames({ 'test-student-name': TEST }))}
      {renderName(props.middleName, classnames({ 'test-student-middleName': TEST }))}
      {renderName(props.surname, classnames({ 'test-student-surname': TEST }))}
    </div>;
  }

  function renderName(name, nameClasses) {
    if (!name) {
      return;
    }

    return <div className={nameClasses}>{name}</div>;
  }
};

Student.propTypes = {
  disabled: React.PropTypes.bool,
  middleName: React.PropTypes.string,
  name: React.PropTypes.string,
  onStudentClick: React.PropTypes.func,
  src: React.PropTypes.string,
  surname: React.PropTypes.string,
};

export default Student;
