import React from 'react';
import { mount } from 'enzyme';
import userManager from './userManager';
import Config from 'domain/Config';
import IdleTimeoutHandler from './IdleTimeoutHandler';

jest.mock('./userManager');

const mountComponent = () => mount(<IdleTimeoutHandler><div id="inner" /></IdleTimeoutHandler>);

beforeEach(() => {
  jest.resetAllMocks();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe('when autoSignOutTimeout is false', () => {
  beforeEach(() => {
    Config.merge({ autoSignOutTimeout: false });
  });

  test('does not call userManager.forceSignoutRedirect()', () => {
    mountComponent();
    jest.runAllTimers();
    expect(userManager.forceSignoutRedirect).not.toHaveBeenCalled();
  });

  test('renders its children', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });
});

describe('when autoSignOutTimeout is a number', () => {
  const autoSignOutTimeout = 1;
  beforeEach(() => {
    Config.merge({ autoSignOutTimeout });
  });

  test('calls userManager.forceSignoutRedirect() after the seconds set in autoSignOutTimeout', () => {
    mountComponent();
    jest.runAllTimers();
    expect(userManager.forceSignoutRedirect).toHaveBeenCalled();
  });

  test('does not call userManager.forceSignoutRedirect() after the seconds set in autoSignOutTimeout ' +
      'if there are some user interactions happening', () => {
    const halfTimeoutTime = (autoSignOutTimeout * 1000) / 2;
    mountComponent();
    jest.runTimersToTime(halfTimeoutTime);
    window.document.dispatchEvent(new Event('click'));
    jest.runTimersToTime(halfTimeoutTime);
    expect(userManager.forceSignoutRedirect).not.toHaveBeenCalled();
  });

  test('renders its children', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });
});
