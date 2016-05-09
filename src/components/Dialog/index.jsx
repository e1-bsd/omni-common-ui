import styles from './style.postcss';

import React from 'react';
import Modal from 'react-modal';
import Card from 'components/Card';

const Dialog = (props) => {
  return <Modal className={styles.Dialog}
      overlayClassName={styles.Overlay}
      isOpen={true}>
    <Card>
      <Card.Content>
        <p>Modal Content</p>
      </Card.Content>
    </Card>
  </Modal>;
};

Dialog.propTypes = {
};

export default Dialog;
