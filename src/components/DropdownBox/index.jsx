import styles from './style.postcss';

import React, { Component } from 'react';
import classnames from 'classnames';
import DropdownBoxItem from './DropdownBoxItem';
import is from 'is_js';

class DropdownBox extends Component {
  constructor(props) {
    super(props);
    this._onClickedOutside = this._onClickedOutside.bind(this);
  }

  componentDidMount() {
    if (is.function(this.props.onClickOutside)) {
      document.body.addEventListener('click', this._onClickedOutside);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this._onClickedOutside);
  }

  _onClickedOutside(evt) {
    if (this._node.contains(evt.target)) {
      return;
    }

    this.props.onClickOutside();
  }

  render() {
    const { className, children } = this.props;
    return <div className={classnames(styles.DropdownBox, className)}
        ref={(c) => { this._node = c; }}>
      {React.Children.toArray(children).filter((child) => child.type === DropdownBoxItem)}
    </div>;
  }
}

DropdownBox.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onClickOutside: React.PropTypes.func,
};

DropdownBox.Item = DropdownBoxItem;

export default DropdownBox;
