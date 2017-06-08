import React from 'react';
import { mount } from 'enzyme';

jest.mock('./userManager');

global.sessionStorage = {};

let props;
let userManager;
let SingleSignOnHandler;

const mountComponent = () => mount(<SingleSignOnHandler {...props}>
  <div id="inner" />
</SingleSignOnHandler>);

beforeEach(() => {
  props = {
    fetchPrivilegesIfNeeded: jest.fn(),
    user: {
      expired: false,
      profile: {
        sub: '123',
      },
    },
  };
});

describe('when featureLogin is false', () => {
  beforeEach(() => {
    jest.resetModules();
    const Config = require('domain/Config');
    userManager = require('./userManager');

    Config.merge({ featureLogin: false });
    SingleSignOnHandler = require('./SingleSignOnHandler').SingleSignOnHandler;
  });

  test('does not call userManager.signinRedirect() even if the user is not valid', () => {
    props.user = null;
    mountComponent();
    expect(userManager.signinRedirect).not.toHaveBeenCalled();
  });

  test('does not call userManager.signinRedirect() even if the user is expired', () => {
    props.user.expired = true;
    mountComponent();
    expect(userManager.signinRedirect).not.toHaveBeenCalled();
  });

  test('does not call fetchPrivilegesIfNeeded even if the user is fine', () => {
    mountComponent();
    expect(props.fetchPrivilegesIfNeeded).not.toHaveBeenCalled();
  });

  test('renders its children if the user is fine', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });

  test('renders its children even if the user is not valid', () => {
    props.user = null;
    const wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });
});

describe('when featureLogin is true', () => {
  beforeEach(() => {
    jest.resetModules();
    const Config = require('domain/Config');
    userManager = require('./userManager');

    Config.merge({ featureLogin: true });
    SingleSignOnHandler = require('./SingleSignOnHandler').SingleSignOnHandler;
  });

  test('calls userManager.signinRedirectWithValidation() if the user is not valid', () => {
    props.user = null;
    mountComponent();
    expect(userManager.signinRedirectWithValidation).toHaveBeenCalled();
  });

  test('calls userManager.signinRedirectWithValidation() if the user is expired', () => {
    props.user.expired = true;
    mountComponent();
    expect(userManager.signinRedirectWithValidation).toHaveBeenCalled();
  });

  test('calls fetchPrivilegesIfNeeded if the user is fine', () => {
    mountComponent();
    expect(props.fetchPrivilegesIfNeeded).toHaveBeenCalled();
  });

  test('renders its children if the user is fine', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });

  test('does not render its children if the user is not valid', () => {
    props.user = null;
    const wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(0);
  });
});
