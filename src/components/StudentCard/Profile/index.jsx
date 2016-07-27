import styles from './style.postcss';

import React from 'react';
import StudentPicture from 'components/StudentPicture';
import Card from 'components/Card';
import classnames from 'classnames';
import ProductionStatus from 'components/ProductionStatus';

const Profile = (props, { withSeparatorLine }) => {
  const { status, statusInitial, statusHighlighted } = props;
  const classes = classnames(styles.StudentCard_profile,
      styles.__1,
      { [styles.__separated]: withSeparatorLine });

  const renderName = (prop, name, nameClasses) => {
    if (! name) {
      return;
    }
    return <div className={nameClasses} data-prop={prop}>{name}</div>;
  };

  return <Card.Content withoutBottomPadding>
    <div className={classes}>
      <StudentPicture src={props.avatarUrl}
          gender={props.gender}
          className={styles.StudentCard_profile_image} />
      <div className={styles.StudentCard_profile_info}>
        {renderName('name', props.name, styles.StudentCard_profile_name)}
        {renderName('surname', props.surname, styles.StudentCard_profile_surname)}
      </div>
      <ProductionStatus className={styles.StudentCard_profile_status}
          status={status}
          initial={statusInitial}
          highlighted={statusHighlighted} />
    </div>
  </Card.Content>;
};

Profile.contextTypes = {
  withSeparatorLine: React.PropTypes.bool,
};

Profile.propTypes = {
  name: React.PropTypes.string,
  surname: React.PropTypes.string,
  gender: React.PropTypes.string,
  avatarUrl: React.PropTypes.string,
  status: React.PropTypes.string,
  statusInitial: React.PropTypes.string,
  statusHighlighted: React.PropTypes.bool,
};

export default Profile;
