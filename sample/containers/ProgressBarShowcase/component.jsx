import React from 'react';
import { ProgressBar } from 'omni-common-ui';
import Showcase from 'components/Showcase';

const ProgressBarShowcase = () => <Showcase title="Progress bars" titleLink="progress-bars">
  <div>
    <ProgressBar />
    <ProgressBar progress={50} />
    <ProgressBar progress={50} total={50} />
  </div>
</Showcase>;

export default ProgressBarShowcase;
