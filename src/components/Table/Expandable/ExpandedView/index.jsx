import React from 'react';
import Dialog from 'components/Dialog';

const ExpandedView = (props) =>
    <Dialog isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}>
      {props.children}
    </Dialog>;

ExpandedView.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  onRequestClose: React.PropTypes.func.isRequired,
};

export default ExpandedView;
