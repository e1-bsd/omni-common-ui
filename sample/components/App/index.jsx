import React, { Component } from 'react';
import { Button } from 'omni-common-ui';
import log from 'loglevel';

class App extends Component {
  render() {
    return <div>
      <Button onClick={() => log.info('Test button clicked!')}>Test button</Button>
    </div>;
  }
}

export default App;
