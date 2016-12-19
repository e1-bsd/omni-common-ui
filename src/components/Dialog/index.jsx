import styles from './style.postcss';

import React from 'react';
import Modal from 'react-modal';
import Card from 'components/Card';

const Dialog = (props) => <Modal className={styles.Dialog}
    overlayClassName={styles.Overlay}
    onRequestClose={props.onRequestClose}
    portalClassName={styles.Portal}
    isOpen={props.isOpen}>
  <Card className={props.className}>
    <Card.Content>
      {props.children}
    </Card.Content>
  </Card>
</Modal>;

Dialog.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  onRequestClose: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default Dialog;
