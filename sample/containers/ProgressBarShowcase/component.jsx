import styles from './style.postcss';

import React from 'react';
import { ProgressBar } from 'omni-common-ui';
import Showcase from 'components/Showcase';

const ProgressBarShowcase = () => <Showcase title="Progress bars" titleLink="progress-bars">
  <div>
    {/* Standard bars */}
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper} />
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper}
        value={50} />
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper}
        value={50} max={50} />

    {/* Rounded bars */}
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper}
        rounded />
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper}
        value={50} rounded />
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper}
        value={50} max={50} rounded />

    {/* Larger bars */}
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper}
        larger />
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper}
        value={50} larger />
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper}
        value={50} max={50} larger />

    {/* Larger rounded bars */}
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper}
        larger rounded />
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper}
        value={50} larger rounded />
    <ProgressBar className={styles.ProgressBarShowcase_barWrapper}
        value={50} max={50} larger rounded />
  </div>
</Showcase>;

export default ProgressBarShowcase;
