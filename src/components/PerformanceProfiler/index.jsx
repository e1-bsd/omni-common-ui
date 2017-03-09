import styles from './style.postcss';
import startIcon from './start.inline.svg';
import stopIcon from './stop.inline.svg';
import wastedIcon from './wasted.inline.svg';
import operationsIcon from './operations.inline.svg';

import React from 'react';
import ReactPerf from 'react-addons-perf';
import Button from 'components/Button';
import InlineSvg from 'components/InlineSvg';

class PerformanceProfiler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { started: false };
  }

  toggle() {
    const { started } = this.state;
    started ? ReactPerf.stop() : ReactPerf.start();
    this.setState({ started: ! started });
  }

  printWasted() {
    const lastMeasurements = ReactPerf.getLastMeasurements();
    ReactPerf.printWasted(lastMeasurements);
  }

  printOperations() {
    const lastMeasurements = ReactPerf.getLastMeasurements();
    ReactPerf.printOperations(lastMeasurements);
  }

  render() {
    const { started } = this.state;
    return <div className={styles.PerformanceProfiler}>
      <Button className={styles.PerformanceProfiler_button}
          onClick={() => this.toggle()}
          type={Button.Type.primary}>
        <InlineSvg className={styles.PerformanceProfiler_button_icon}>
          {started ? stopIcon : startIcon}
        </InlineSvg>
      </Button>
      <Button className={styles.PerformanceProfiler_button}
          onClick={() => this.printWasted()}
          type={Button.Type.default}>
        <InlineSvg className={styles.PerformanceProfiler_button_icon}>
          {wastedIcon}
        </InlineSvg>
      </Button>
      <Button className={styles.PerformanceProfiler_button}
          onClick={() => this.printOperations()}
          type={Button.Type.default}>
        <InlineSvg className={styles.PerformanceProfiler_button_icon}>
          {operationsIcon}
        </InlineSvg>
      </Button>
    </div>;
  }
}

export default PerformanceProfiler;
