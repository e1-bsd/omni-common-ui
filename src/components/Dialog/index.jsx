import styles from './style.postcss';

import React from 'react';
import pure from 'recompose/pure';
import Modal from 'react-modal';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Card from 'components/Card';
import Icon from 'components/Icon';

export const Dialog = (props) => <Modal className={styles.Dialog}
    overlayClassName={styles.Overlay}
    onRequestClose={(ev) => props.onRequestClose && props.onRequestClose('escape', ev)}
    portalClassName={styles.Portal}
    isOpen={props.isOpen}>
  <Card className={classnames(styles.Dialog_card, props.className)}>
    <Card.Content className={classnames({ [styles.__paddingless]: props.paddingless })}>
      {props.children}
    </Card.Content>
    {
      props.withCloseButton &&
      <div className={styles.Dialog_closeIcon}
          onClick={(ev) => props.onRequestClose && props.onRequestClose('button', ev)}>
        <Icon id="close" />
      </div>
    }
    <div className={classnames(styles.LoadingOverlay, {
      [styles.__visible]: !! props.isLoading,
    })}>
      <div className={styles.LoadingOverlay_inner} />
    </div>
  </Card>
</Modal>;

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  withCloseButton: PropTypes.bool,
  onRequestClose: PropTypes.func,  /* called with 'escape' or 'button' arg */
  children: PropTypes.node,
  className: PropTypes.string,
  paddingless: PropTypes.bool,
};

export default pure(Dialog);
