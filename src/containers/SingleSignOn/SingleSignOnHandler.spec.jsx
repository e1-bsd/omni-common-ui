import React from 'react';
import Sinon from 'sinon';
import { mount } from 'enzyme';
import userManager from './userManager';
import * as ConfigPkg from 'domain/Config';
import { Map } from 'immutable';

jest.mock('./userManager', () => 'userManager');

let props;
let signinRedirect;
let SingleSignOnHandler;

const mountComponent = () => mount(<SingleSignOnHandler {...props}>
  <div id="inner" />
</SingleSignOnHandler>);

describe('when featureLogin is false', () => {
  ConfigPkg.default = new Map({ featureLogin: false });
  SingleSignOnHandler = require('./SingleSignOnHandler').SingleSignOnHandler;

  beforeEach(() => {
    signinRedirect = Sinon.stub(userManager, 'signinRedirectWithValidation');
    signinRedirect.returns();
    props = {
      fetchPrivilegesIfNeeded: Sinon.spy(),
      user: {
        expired: false,
        profile: {
          sub: '123',
        },
      },
    };
  });

  afterEach(() => {
    signinRedirect.restore();
  });

  describe('when featureLogin is false', () => {
    test('does not call userManager.signinRedirect() even if the user is not valid', () => {
      props.user = null;
      mountComponent();
      expect(signinRedirect.called).toBe(false);
    });

    test('does not call userManager.signinRedirect() even if the user is expired', () => {
      props.user.expired = true;
      mountComponent();
      expect(signinRedirect.called).toBe(false);
    });

    test('does not call fetchPrivilegesIfNeeded even if the user is fine', () => {
      mountComponent();
      expect(props.fetchPrivilegesIfNeeded.called).toBe(false);
    });

    test('renders its children if the user is fine', () => {
      const wrapper = mountComponent();
      expect(wrapper).to.have.descendants('#inner');
    });

    test('renders its children even if the user is not valid', () => {
      props.user = null;
      const wrapper = mountComponent();
      expect(wrapper).to.have.descendants('#inner');
    });
  });
});

describe('when featureLogin is true', () => {
  ConfigPkg.default = new Map({ featureLogin: true });
  SingleSignOnHandler = require('./SingleSignOnHandler').SingleSignOnHandler;

  test('calls userManager.signinRedirect() if the user is not valid', () => {
    props.user = null;
    mountComponent();
    expect(signinRedirect.called).toBe(true);
  });

  test('calls userManager.signinRedirect() if the user is expired', () => {
    props.user.expired = true;
    mountComponent();
    expect(signinRedirect.called).toBe(true);
  });

  test('calls fetchPrivilegesIfNeeded if the user is fine', () => {
    mountComponent();
    expect(props.fetchPrivilegesIfNeeded.called).toBe(true);
  });

  test('renders its children if the user is fine', () => {
    const wrapper = mountComponent();
    expect(wrapper).to.have.descendants('#inner');
  });

  test('does not render its children if the user is not valid', () => {
    props.user = null;
    const wrapper = mountComponent();
    expect(wrapper).to.not.have.descendants('#inner');
  });
});
