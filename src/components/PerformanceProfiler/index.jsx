import React from 'react';
import ReactPerf from 'react-addons-perf';
import styles from './style.postcss';

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
      <h1>Performance Profiler</h1>
      <button onClick={() => this.toggle()}>{started ? 'Stop' : 'Start'}</button>
      <button onClick={() => this.printWasted()}>Print Wasted</button>
      <button onClick={() => this.printOperations()}>Print Operations</button>
    </div>;
  }
}

export default PerformanceProfiler;
