import styles from './style.postcss';

import React from 'react';
import is from 'is_js';
import StudentPicture from 'components/StudentPicture';
import Card from 'components/Card';
import classnames from 'classnames';
import ProductionStatus from 'components/ProductionStatus';

const Profile = (props, { withSeparatorLine, backgroundless }) => {
  const { status, statusHighlighted } = props;
  const classes = classnames(styles.StudentCard_profile,
      styles.__1, {
        [styles.__separated]: withSeparatorLine,
        [styles.__backgroundless]: backgroundless,
      }, props.className);

  const renderName = (prop, name, nameClasses) => {
    if (! name) {
      return;
    }
    return <div className={nameClasses} data-prop={prop}>{name}</div>;
  };
  const getStr = (name) => is.undefined(name) ? '' : `${name}`;
  return <Card.Content withoutBottomPadding>
    <div className={classes}>
      <StudentPicture src={props.avatarUrl}
          gender={props.gender}
          className={classnames(styles.StudentCard_profile_image, {
            [styles.__bigger]: !! props.withBiggerAvatar,
          })} />
      <div className={styles.StudentCard_profile_info}>
        {renderName('name', `${getStr(props.name)} ${getStr(props.surname)}`, styles.StudentCard_profile_name)}
        {renderName('localName', props.localName, styles.StudentCard_profile_localName)}
        <ProductionStatus className={styles.StudentCard_profile_status}
            status={status}
            highlighted={statusHighlighted} />
      </div>
    </div>
  </Card.Content>;
};

Profile.contextTypes = {
  backgroundless: React.PropTypes.bool,
  withSeparatorLine: React.PropTypes.bool,
};

Profile.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string,
  surname: React.PropTypes.string,
  localName: React.PropTypes.string,
  gender: React.PropTypes.string,
  avatarUrl: React.PropTypes.string,
  status: React.PropTypes.string,
  statusInitial: React.PropTypes.string,
  statusHighlighted: React.PropTypes.bool,
  withBiggerAvatar: React.PropTypes.bool,
};

export default Profile;
