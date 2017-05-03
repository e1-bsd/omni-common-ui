import styles from './style.postcss';

import React from 'react';
import is from 'is_js';
import StudentPicture from 'components/StudentPicture';
import Card from 'components/Card';
import classnames from 'classnames';
import ProductionStatus from 'components/ProductionStatus';
import Person from 'components/Person';
import testClass from 'domain/testClass';

const Profile = (props, { withSeparatorLine, backgroundless, vertical }) => {
  const { status, statusHighlighted } = props;
  const classes = classnames(styles.StudentCard_profile,
      styles.__1, {
        [styles.__separated]: withSeparatorLine,
        [styles.__backgroundless]: backgroundless,
        [styles.__vertical]: vertical,
      }, props.className);

  const renderName = (prop, name, nameClasses) => {
    if (! name) {
      return;
    }
    return <div className={nameClasses} data-prop={prop}>{name}</div>;
  };
  const getStr = (name) => {
    if (is.undefined(name)) {
      return '';
    }
    return name;
  };
  const nameClass = classnames(styles.StudentCard_profile_name,
    testClass('studentCard-name'),
    { [styles.__vertical]: vertical }
  );
  const localNameClass = classnames(styles.StudentCard_profile_localName,
    testClass('studentCard-localName'),
    { [styles.__vertical]: vertical }
  );
  const statusClass = classnames(styles.StudentCard_profile_status,
    testClass('studentCard-status'));
  return <Card.Content withoutBottomPadding>
    <Person className={classes} vertical={vertical}>
      <StudentPicture src={props.avatarUrl}
          gender={props.gender}
          className={classnames(styles.StudentCard_profile_image, {
            [styles.__bigger]: !! props.withBiggerAvatar,
            [styles.__vertical]: vertical,
          })} />
      {renderName('name', `${getStr(props.name)} ${getStr(props.surname)}`, nameClass)}
      {renderName('localName', props.localName, localNameClass)}
      <ProductionStatus className={statusClass}
          status={status}
          highlighted={statusHighlighted} />
    </Person>
  </Card.Content>;
};

Profile.contextTypes = {
  backgroundless: React.PropTypes.bool,
  withSeparatorLine: React.PropTypes.bool,
  vertical: React.PropTypes.bool,
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
