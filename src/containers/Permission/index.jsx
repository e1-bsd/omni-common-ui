import React from 'react';
import connect from 'domain/connect';
import PrivilegeChecker from 'domain/PrivilegeChecker';

const Permission = (props) => {
  if (! PrivilegeChecker.hasPrivilege(props.state, props.permissionId)) {
    return null;
  }

  return props.children;
};

function mapStateToProps(state) {
  return { state };
}

Permission.propTypes = {
  permissionId: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default connect(mapStateToProps)(Permission);
