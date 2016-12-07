import styles from './style.postcss';
import React from 'react';

const Footer = () => <div className={styles.Footer}>
  <div className={styles.Footer_logo} />
  <div className={styles.Footer_content}>
    <p className={styles.Footer_content_row}>
      <a className={styles.Footer_content_link}
          target="_blank" rel="noopener noreferrer"
          href="http://www.ef.com/privacy-policy/">
        Privacy Policy
      </a>
      <span className={styles.Footer_content_separator} />
      <a className={styles.Footer_content_link}
          target="_blank" rel="noopener noreferrer"
          href="https://helpcenter.ef.com">Help Center</a>
    </p>
    <p className={styles.Footer_content_row}>
      <span>&copy; EF Education First 2016.&nbsp;</span>
      <span>All rights reserved.</span>
    </p>
  </div>
</div>;

export default Footer;
