import React, { Component } from 'react';
import ButtonShowcase from 'components/ButtonShowcase';
import CardShowcase from 'components/CardShowcase';
import FormShowcase from 'components/FormShowcase';

class App extends Component {
  render() {
    return <div>
      <ButtonShowcase />
      <CardShowcase />
      <FormShowcase />
    </div>;
  }
}

export default App;
