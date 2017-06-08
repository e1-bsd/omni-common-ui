import React from 'react';
import Sinon from 'sinon';
import { mount } from 'enzyme';
import userManager from './userManager';
import Config from 'domain/Config';
import IdleTimeoutHandler from './IdleTimeoutHandler';

jest.mock('domain/Config');
jest.mock('./userManager', () => ({ forceSignoutRedirect: jest.fn() }));

let signoutRedirect;

const mountComponent = () => mount(<IdleTimeoutHandler><div id="inner" /></IdleTimeoutHandler>);

beforeEach(() => {
  signoutRedirect = Sinon.stub(userManager, 'signoutRedirect');
  signoutRedirect.returns();
  Config.merge({ autoSignOutTimeout: false });
});

afterEach(() => {
  signoutRedirect.restore();
});

describe('when autoSignOutTimeout is false', () => {
  test('does not call userManager.signoutRedirect()', function test(done) {
    this.timeout(5000);
    mountComponent();
    setTimeout(() => {
      expect(signoutRedirect.called).toBe(false);
      done();
    }, 2000);
  });

  test('renders its children', () => {
    const wrapper = mountComponent();
    expect(wrapper).to.have.descendants('#inner');
  });
});

describe('when autoSignOutTimeout is a number', () => {
  beforeEach(() => {
    Config.merge({ autoSignOutTimeout: 2 });
  });

  test('calls userManager.signoutRedirect() after the seconds set in autoSignOutTimeout', function test(done) {
    this.timeout(5000);
    mountComponent();
    setTimeout(() => {
      expect(signoutRedirect.called).toBe(true);
      done();
    }, 2000);
  });

  test('does not call userManager.signoutRedirect() after the seconds set in autoSignOutTimeout ' +
      'if there are some user interactions happening', function test(done) {
    this.timeout(5000);
    mountComponent();
    setTimeout(() => window.document.dispatchEvent(new Event('click')), 1000);
    setTimeout(() => {
      expect(signoutRedirect.called).toBe(false);
      done();
    }, 2000);
  });

  test('renders its children', () => {
    const wrapper = mountComponent();
    expect(wrapper).to.have.descendants('#inner');
  });
});
