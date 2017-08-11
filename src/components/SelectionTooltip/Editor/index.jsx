import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Editor extends PureComponent {

  _shouldShow() {
    return this.props.selection && this.props.selection > 0;
  }

  render() {
    if (this._shouldShow()) {
      return <div>
        <div><span>Your Selection is {this.props.selection}</span></div>
        <label>Comment<input type="text" name="comment" /></label>
      </div>;
    }
    return null;
  }

}

Editor.propTypes = {
  selection: PropTypes.string,
};

export default Editor;
