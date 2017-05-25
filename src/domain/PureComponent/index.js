/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPureComponent
 */

import { Component } from 'react';
import ReactNoopUpdateQueue from 'react/lib/ReactNoopUpdateQueue';
import shallowEqual from 'domain/shallowEqual';

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = {};
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;

  // NEW! custom shallowEqual shouldComponentUpdate checks
  this.shouldComponentUpdate = (nextProps, nextState) =>
    ! shallowEqual(this.props, nextProps) || ! shallowEqual(this.state, nextState);
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
Object.assign(ReactPureComponent.prototype, Component.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

export default ReactPureComponent;
