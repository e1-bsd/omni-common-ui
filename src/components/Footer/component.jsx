import styles from './style.postcss';
import React from 'react';
import Icon from 'components/Icon';

const Footer = () => <div className={styles.Footer}>
  <Icon id="ef-logo" className={styles.Footer_logo} />
  <div className={styles.Footer_content}>
    <div className={styles.Footer_content_row}>
      <a className={styles.Footer_content_link}
          target="_blank"
          rel="noopener noreferrer"
          href="https://helpcenter.ef.com">Help Center</a>
    </div>
    <div className={styles.Footer_content_row}>
      <div className={styles.Footer_copyright}>
        <span className={styles.Footer_copyright_firstLine}>
          EF Education First {new Date().getFullYear()}.&nbsp;
        </span>
        <br className={styles.Footer_break} />
        All rights reserved.
      </div>
    </div>
  </div>
</div>;

export default Footer;
