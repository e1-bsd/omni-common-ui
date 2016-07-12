import React from 'react';

const Content = (props) => <div>
  {props.children}
</div>;

Content.propTypes = {
  children: React.PropTypes.node,
};

export default Content;
