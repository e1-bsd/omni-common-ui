import React, { Component } from 'react';
import ButtonShowcase from 'components/ButtonShowcase';
import CardShowcase from 'components/CardShowcase';
import FormShowcase from 'components/FormShowcase';
import DialogShowcase from 'components/DialogShowcase';
import TableShowcase from 'components/TableShowcase';

class App extends Component {
  render() {
    return <div>
      <ButtonShowcase />
      <CardShowcase />
      <FormShowcase />
      <DialogShowcase />
      <TableShowcase />
    </div>;
  }
}

export default App;
