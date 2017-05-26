import { pure } from 'recompose';
import connect from 'domain/connect';
import PrivilegeChecker from 'domain/PrivilegeChecker';
import PropTypes from 'prop-types';

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
  permissionId: PropTypes.string,
  children: PropTypes.node,
};

export default connect(mapStateToProps)(pure(Permission));
