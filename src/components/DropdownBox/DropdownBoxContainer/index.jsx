import React, { Component } from 'react';
import classnames from 'classnames';
import is from 'is_js';

class DropdownBoxContainer extends Component {
  constructor(props) {
    super(props);
    this._onClickedOutside = this._onClickedOutside.bind(this);
  }

  componentDidMount() {
    if (is.function(this.props.onClickOutside)) {
      document.body.addEventListener('click', this._onClickedOutside);
      document.body.addEventListener('touchstart', this._onClickedOutside);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this._onClickedOutside);
    document.body.removeEventListener('touchstart', this._onClickedOutside);
  }

  _onClickedOutside(evt) {
    if (this._node.contains(evt.target)) {
      return;
    }

    this.props.onClickOutside();
  }

  render() {
    const { className, children } = this.props;
    return <div className={classnames(className)}
        ref={(c) => { this._node = c; }}>
      {children}
    </div>;
  }
}

DropdownBoxContainer.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onClickOutside: React.PropTypes.func,
};

export default DropdownBoxContainer;
