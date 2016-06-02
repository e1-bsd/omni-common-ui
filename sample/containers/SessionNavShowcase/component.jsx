import React, { Component } from 'react';
import Showcase from 'components/Showcase';
import { SessionNav } from 'omni-common-ui';

class SessionNavShowcase extends Component {

  constructor(props) {
    super(props);
    const sessions = [{ name: 'Unit 1', date: 'Saturday, 4 June 2016' },
      { name: 'Unit 2', date: 'Saturday, 11 June 2016' },
      { name: 'Unit 3', date: 'Saturday, 18 June 2016' }];
    this.state = { sessions, current: 1 };
  }

  handleBack() {
    this.setState({ current: this.state.current - 1 });
  }

  handleForward() {
    this.setState({ current: this.state.current + 1 });
  }

  render() {
    const currentSession = this.state.sessions[this.state.current];
    return <Showcase title="Session Navigation" titleLink="session-nav">
      <div>
        <SessionNav name={currentSession.name}
            date={currentSession.date}
            onBack={() => this.handleBack()}
            onForward={() => this.handleForward()} />
      </div>
    </Showcase>;
  }

}

export default SessionNavShowcase;
