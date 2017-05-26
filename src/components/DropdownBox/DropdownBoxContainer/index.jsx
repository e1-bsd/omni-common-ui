import React, { PureComponent } from 'react';
import classnames from 'classnames';
import is from 'is_js';
import PropTypes from 'prop-types';

class DropdownBoxContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._onClickedOutside = this._onClickedOutside.bind(this);
    this._onRef = this._onRef.bind(this);
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

  _onRef(ref) {
    this._node = ref;
  }

  render() {
    const { className, children } = this.props;
    return <div className={classnames(className)}
        ref={this._onRef}>
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
