/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowEqual
 * @typechecks
 * @flow
 */

/*
 * ! Modified ! to cast functions to strings before checking their equality
 */

/* eslint-disable no-self-compare */

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y, token) {
  // ! NEW ! shortcut for functions. toString before equality check
  if (typeof x === 'function' && typeof y === 'function' &&
      x.toString() === y.toString()) {
    console.log(`saved a function equality comparison! ${token}`);
    return true;
  }
  // SameValue algorithm
  if (x === y) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  // Step 6.a: NaN == NaN
  return x !== x && y !== y;
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  const token = Number.parseInt(Math.random() * 10000, 10);

  if (is(objA, objB, token)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (
      ! hasOwnProperty.call(objB, keysA[i]) ||
      ! is(objA[keysA[i]], objB[keysA[i]], token)
    ) {
      // console.log(`:( differs: ${keysA[i]}`, objB[keysA[i]]);
      return false;
    }
  }

  console.log(`and the main method returned true ${token}`);
  return true;
}

export default shallowEqual;
