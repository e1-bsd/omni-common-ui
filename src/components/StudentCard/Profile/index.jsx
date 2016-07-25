import styles from './style.postcss';

import React from 'react';
import { StudentPicture, Card } from 'omni-common-ui';
import classnames from 'classnames';

const Profile = (props, { withSeparatorLine }) => {
  let classes;
  if (withSeparatorLine) {
    classes = classnames(styles.StudentCard_profile, styles.__1, styles.__separated);
  } else {
    classes = classnames(styles.StudentCard_profile, styles.__1);
  }

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
    </div>
  </Card.Content>;
};

Profile.contextTypes = {
  withSeparatorLine: React.PropTypes.bool,
};

Profile.propTypes = {
  name: React.PropTypes.string,
  surname: React.PropTypes.string,
  gender: React.PropTypes.number,
  avatarUrl: React.PropTypes.string,
  withSeparatorLine: React.PropTypes.bool,
};

export default Profile;
