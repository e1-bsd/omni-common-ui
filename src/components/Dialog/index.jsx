import React from 'react';
import Modal from 'react-modal';

const Dialog = (props) => {
  return <Modal isOpen={true}>
    <h1>Modal Content</h1>
    <p>Etc.</p>
  </Modal>;
};

Dialog.propTypes = {
};

export default Dialog;
