import React, { Component } from 'react';
import ButtonShowcase from 'components/ButtonShowcase';
import CardShowcase from 'components/CardShowcase';
import FormShowcase from 'components/FormShowcase';
import DialogShowcase from 'components/DialogShowcase';

class App extends Component {
  render() {
    return <div>
      <ButtonShowcase />
      <CardShowcase />
      <FormShowcase />
      <DialogShowcase />
    </div>;
  }
}

export default App;
