import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Person from 'components/Person';
import StudentPicture from 'components/StudentPicture';
import ProductionStatus from 'components/ProductionStatus';

const PersonComp = (props) => {
  const classes = classnames(styles.Person,
      styles.__1, {
        [styles.__backgroundless]: props.backgroundless,
        [styles.__vertical]: props.vertical,
      }, props.className);

  return <Person className={classes} vertical={props.vertical}>
    <StudentPicture src={props.avatarUrl}
        gender={props.gender}
        className={classnames(styles.Person_picture, {
          [styles.__bigger]: !! props.withBiggerAvatar,
          [styles.__vertical]: !! props.vertical,
        })} />
    {props.nameNode}
    {props.localNameNode}
    <ProductionStatus className={props.productionStatusClassName}
        status={props.productionStatus}
        highlighted={props.productionStatusHighlighted} />
  </Person>;
};

PersonComp.propTypes = {
  className: PropTypes.string,
  pictureClassName: PropTypes.string,
  productionStatusClassName: PropTypes.string,
  avatarUrl: PropTypes.string,
  gender: PropTypes.string,
  nameNode: PropTypes.node,
  localNameNode: PropTypes.node,
  productionStatus: PropTypes.string,
  productionStatusHighlighted: PropTypes.bool,
  backgroundless: PropTypes.bool,
  vertical: PropTypes.bool,
  withBiggerAvatar: PropTypes.bool,
};

export default pure(PersonComp);
