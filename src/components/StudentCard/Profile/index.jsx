import styles from './style.postcss';

import React from 'react';
import is from 'is_js';
import StudentPicture from 'components/StudentPicture';
import Card from 'components/Card';
import classnames from 'classnames';
import ProductionStatus from 'components/ProductionStatus';
import Person from 'components/Person';
import testClass from 'domain/testClass';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Profile = (props, { withSeparatorLine, backgroundless, vertical }) => {
  const { status, statusHighlighted } = props;
  const classes = classnames(styles.StudentCard_profile,
      styles.__1, {
        [styles.__separated]: withSeparatorLine,
        [styles.__backgroundless]: backgroundless,
        [styles.__vertical]: vertical,
      }, props.className);

  const renderName = (prop, name, nameClasses, nameLink) => {
    if (! name) {
      return;
    }
    const nameProps = { className: nameClasses, 'data-prop': prop };
    return is.existy(nameLink) ?
      <Link {...nameProps} to={nameLink}>{name}</Link> :
      <div {...nameProps}>name</div>;
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
  const name = `${getStr(props.name)} ${getStr(props.surname)}`;
  return <Card.Content withoutBottomPadding>
    <Person className={classes} vertical={vertical}>
      <StudentPicture src={props.avatarUrl}
          gender={props.gender}
          className={classnames(styles.StudentCard_profile_image, {
            [styles.__bigger]: !! props.withBiggerAvatar,
            [styles.__vertical]: vertical,
          })} />
      {renderName('name', name, nameClass, props.nameLink)}
      {renderName('localName', props.localName, localNameClass)}
      <ProductionStatus className={statusClass}
          status={status}
          highlighted={statusHighlighted} />
    </Person>
  </Card.Content>;
};

Profile.contextTypes = {
  backgroundless: PropTypes.bool,
  withSeparatorLine: PropTypes.bool,
  vertical: PropTypes.bool,
};

Profile.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  surname: PropTypes.string,
  localName: PropTypes.string,
  gender: PropTypes.string,
  avatarUrl: PropTypes.string,
  status: PropTypes.string,
  statusInitial: PropTypes.string,
  statusHighlighted: PropTypes.bool,
  withBiggerAvatar: PropTypes.bool,
  nameLink: PropTypes.string,
};

export default Profile;
