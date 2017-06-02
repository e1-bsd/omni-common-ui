import React from 'react';
import Sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import userManager from './userManager';
import _Config from 'domain/Config';

describe('<IdleTimeoutHandler />', () => {
  let IdleTimeoutHandler;
  let signoutRedirect;

  // eslint-disable-next-line import/no-webpack-loader-syntax, global-require
  const requireComponent = (Config) => require('inject-loader?domain/Config&./userManager!./IdleTimeoutHandler')({
    'domain/Config': _Config.merge(Config),
    './userManager': userManager,
  }).default;

  const mountComponent = () => mount(<IdleTimeoutHandler><div id="inner" /></IdleTimeoutHandler>);

  beforeEach(() => {
    signoutRedirect = Sinon.stub(userManager, 'signoutRedirect');
    signoutRedirect.returns();
    IdleTimeoutHandler = requireComponent({ autoSignOutTimeout: false });
  });

  afterEach(() => {
    signoutRedirect.restore();
  });

  context('when autoSignOutTimeout is false', () => {
    it('does not call userManager.signoutRedirect()', function test(done) {
      this.timeout(5000);
      mountComponent();
      setTimeout(() => {
        expect(signoutRedirect.called).to.be.false;
        done();
      }, 2000);
    });

    it('renders its children', () => {
      const wrapper = mountComponent();
      expect(wrapper).to.have.descendants('#inner');
    });
  });

  context('when autoSignOutTimeout is a number', () => {
    beforeEach(() => {
      IdleTimeoutHandler = requireComponent({ autoSignOutTimeout: 2 });
    });

    it('calls userManager.signoutRedirect() after the seconds set in autoSignOutTimeout', function test(done) {
      this.timeout(5000);
      mountComponent();
      setTimeout(() => {
        expect(signoutRedirect.called).to.be.true;
        done();
      }, 2000);
    });

    it('does not call userManager.signoutRedirect() after the seconds set in autoSignOutTimeout ' +
        'if there are some user interactions happening', function test(done) {
      this.timeout(5000);
      mountComponent();
      setTimeout(() => window.document.dispatchEvent(new Event('click')), 1000);
      setTimeout(() => {
        expect(signoutRedirect.called).to.be.false;
        done();
      }, 2000);
    });

    it('renders its children', () => {
      const wrapper = mountComponent();
      expect(wrapper).to.have.descendants('#inner');
    });
  });
});
