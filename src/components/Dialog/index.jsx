import styles from './style.postcss';

import React from 'react';
import Modal from 'react-modal';

const Dialog = (props) => {
  return <Modal className={styles.Dialog}
      overlayClassName={styles.Overlay}
      isOpen={true}>
    <p>Modal Content</p>
  </Modal>;
};

Dialog.propTypes = {
};

export default Dialog;
