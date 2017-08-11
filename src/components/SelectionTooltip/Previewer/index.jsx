import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Previewer extends PureComponent {

  render() {
    return <div>
      <div>Preview</div>
      <div>{this.props.text}</div>
    </div>;
  }

}

Previewer.propTypes = {
  text: PropTypes.string,
};

export default Previewer;
