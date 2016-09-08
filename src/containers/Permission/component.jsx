import React from 'react';
import { connect } from 'react-redux';

const Permission = (props) => {
  const { permissionId, user } = props;
  if (user &&
      Object.keys(user).length > 0 &&
      user.privileges.indexOf(permissionId) < 0) {
    return null;
  }
  if (user &&
      Object.keys(user).length > 0) {
    return <span>{props.children}</span>;
  }
  return null;
};

function mapStateToProps(state) {
  const user = state.get('rootReducer').get('privileges').items;
  return {
    user,
  };
}

Permission.propTypes = {
  permissionId: React.PropTypes.string,
  user: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default connect(mapStateToProps)(Permission);
