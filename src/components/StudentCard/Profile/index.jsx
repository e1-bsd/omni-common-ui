import styles from './style.postcss';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import is from 'is_js';
import Card from 'components/Card';
import testClass from 'domain/testClass';
import StudentCard from '../';

const Profile = (props, { backgroundless, vertical }) => {
  const { status, statusHighlighted } = props;

  const renderName = (prop, name, nameClasses, nameLink) => {
    if (! name) {
      return;
    }
    const nameProps = { className: nameClasses, 'data-prop': prop };
    return is.existy(nameLink) ?
      <Link {...nameProps} to={nameLink}>{name}</Link> :
      <div {...nameProps}>{name}</div>;
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

  const name = `${getStr(props.name)} ${getStr(props.surname)}`;

  return <Card.Content withoutBottomPadding>
    <StudentCard.Person className={props.className}
        avatarUrl={props.avatarUrl}
        gender={props.gender}
        nameNode={renderName('name', name, nameClass, props.nameLink)}
        localNameNode={renderName('localName', props.localName, localNameClass)}
        backgroundless={backgroundless}
        vertical={vertical}
        withBiggerAvatar={props.withBiggerAvatar}
        statusClassName={testClass('studentCard-status')}
        status={status}
        statusHighlighted={statusHighlighted} />
  </Card.Content>;
};

Profile.contextTypes = {
  backgroundless: PropTypes.bool,
  vertical: PropTypes.bool,
};

Profile.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  surname: PropTypes.string,
  localName: PropTypes.string,
  gender: PropTypes.any,
  avatarUrl: PropTypes.string,
  status: PropTypes.string,
  statusInitial: PropTypes.string,
  statusHighlighted: PropTypes.bool,
  withBiggerAvatar: PropTypes.bool,
  nameLink: PropTypes.string,
};

export default Profile;
