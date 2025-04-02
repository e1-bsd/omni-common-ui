import styles from './style.postcss';
import React from 'react';
import Icon from 'components/Icon';

const Footer = () => <div className={styles.Footer}>
  <Icon id="yingfu-logo" className={styles.Footer_logo} />
  <div className={styles.Footer_content}>
    <div className={styles.Footer_content_row}>
      <div className={styles.Footer_copyright}>
        <span className={styles.Footer_copyright_firstLine}>
          English One AG
        </span>
      </div>
    </div>
  </div>
</div>;

export default Footer;
