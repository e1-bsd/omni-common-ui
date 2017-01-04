import styles from './style.postcss';

import React from 'react';
import Modal from 'react-modal';
import classnames from 'classnames';

import Card from 'components/Card';

const Dialog = (props) => <Modal className={styles.Dialog}
    overlayClassName={styles.Overlay}
    onRequestClose={(ev) =>
      props.onRequestClose && props.onRequestClose('escape', ev)}
    portalClassName={styles.Portal}
    isOpen={props.isOpen}>
  <Card className={props.className}>
    <Card.Content>
      {props.children}
    </Card.Content>
    {props.withCloseButton ? <div className={styles.Dialog_closeIcon}
        onClick={(ev) =>
          props.onRequestClose && props.onRequestClose('button', ev)} /> : null}
    <div className={classnames(styles.LoadingOverlay, {
      [styles.__visible]: !! props.isLoading,
    })}>
      <div className={styles.LoadingOverlay_inner} />
    </div>
  </Card>
</Modal>;

Dialog.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool,
  withCloseButton: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,  /* called with 'escape' or 'button' arg */
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default Dialog;
