import React, { PureComponent } from 'react';
import classnames from 'classnames';
import is from 'is_js';
import PropTypes from 'prop-types';

class DropdownBoxContainer extends PureComponent {
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
  children: PropTypes.node,
  className: PropTypes.string,
  onClickOutside: PropTypes.func,
};

export default DropdownBoxContainer;
