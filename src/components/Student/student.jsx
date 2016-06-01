import React from 'react';
import styles from './style.postcss';
import classnames from 'classnames';

const Student = (props) => {
  const { src } = props;
  const classes = props.disabled ?
    classnames(styles.Student_image, styles.__disabled) : styles.Student_image;
  return <div>
    {renderImage(src, classes)}
    {renderInfo(props.name, props.middleName, props.surname)}
  </div>;
  function renderImage(srcPath, className) {
    return <img src={srcPath} className={className} role="presentation"></img>;
  }
  function renderInfo(name, middleName, surname) {
    return <ul className={styles.Student_info}>
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
