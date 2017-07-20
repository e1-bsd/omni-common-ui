import React from 'react';
import { Map } from 'immutable';
import { mount } from 'enzyme';

global.sessionStorage = {};

let props;
let SingleSignOnHandler;

const mountComponent = () => mount(<SingleSignOnHandler {...props}>
  <div id="inner" />
</SingleSignOnHandler>);

beforeEach(() => {
  props = {
    fetchPrivilegesIfNeeded: jest.fn(),
    user: new Map({
      expired: false,
      profile: {
        sub: '123',
      },
    }),
  };
});

describe('when featureLogin is false', () => {
  beforeEach(() => {
    jest.resetModules();
    const Config = require('domain/Config');

    Config.merge({ featureLogin: false });
    SingleSignOnHandler = require('./SingleSignOnHandler').SingleSignOnHandler;
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

    Config.merge({ featureLogin: true });
    SingleSignOnHandler = require('./SingleSignOnHandler').SingleSignOnHandler;
  });

  test('calls fetchPrivilegesIfNeeded if the user is fine', () => {
    mountComponent();
    expect(props.fetchPrivilegesIfNeeded).toHaveBeenCalled();
  });

  test('renders its children if the user is fine', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('#inner')).toHaveLength(1);
  });
});
