import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';

const OBSERVER_CONFIG = { childList: true, subtree: true, characterData: true };

export default class ContentEditable extends Component {
  constructor() {
    super();
    this._emitChange = this._emitChange.bind(this);
  }

  componentDidMount() {
    invariant(this.htmlEl, 'htmlEl must have been set (via ref)');

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach(this._emitChange);
    });
    this.observer.observe(this.htmlEl, OBSERVER_CONFIG);
  }

  // taken from https://github.com/lovasoa/react-contenteditable
  shouldComponentUpdate(nextProps) {
    // We need not rerender if the change of props simply reflects the user's
    // edits. Rerendering in this case would make the cursor/caret jump.
    return (
      // Rerender if there is no element yet... (somehow?)
      ! this.htmlEl ||
      // ...or if html really changed... (programmatically, not by user edit)
      (nextProps.html !== this.htmlEl.innerHTML &&
        nextProps.html !== this.props.html) ||
      // ...or if editing is enabled or disabled.
      this.props.disabled !== nextProps.disabled ||
      // ...or if className changed
      this.props.className !== nextProps.className
    );
  }

  componentDidUpdate() {
    if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      this.htmlEl.innerHTML = this.props.html;
    }
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  _emitChange() {
    if (! this.htmlEl) return;
    const html = this.htmlEl.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html);
    }
    this.lastHtml = html;
  }

  render() {
    const { html, ...props } = this.props;

    // eslint-disable-next-line
    return <div {...props}
        ref={(e) => { this.htmlEl = e; }}
        contentEditable={! this.props.disabled}
        dangerouslySetInnerHTML={{ __html: html }}>
      {this.props.children}
    </div>;
  }
}

ContentEditable.propTypes = {
  className: PropTypes.string,
  html: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node,
};
