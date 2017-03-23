import React from 'react';
import Sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import userManager from './userManager';
import _Config from 'domain/Config';

describe('<SingleSignOnHandler />', () => {
  let SingleSignOnHandler;
  let props;
  let signinRedirect;
  let signinSilent;

  // eslint-disable-next-line import/no-webpack-loader-syntax, global-require
  const requireComponent = (Config) => require('inject?domain/Config&./userManager!./SingleSignOnHandler')({
    'domain/Config': _Config.merge(Config),
    './userManager': userManager,
  }).SingleSignOnHandler;

  const mountComponent = () => mount(<SingleSignOnHandler {...props}>
    <div id="inner" />
  </SingleSignOnHandler>);

  beforeEach(() => {
    signinRedirect = Sinon.stub(userManager, 'signinRedirect');
    signinRedirect.resolves();

    signinSilent = Sinon.stub(userManager, 'signinSilent');
    signinSilent.resolves();

    SingleSignOnHandler = requireComponent({ featureLogin: false });
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
    signinSilent.restore();
  });

  context('when featureLogin is false', () => {
    it('is a function that just returns prop.children', () => {
      expect(SingleSignOnHandler).to.be.a('function');
      expect(SingleSignOnHandler({ children: 'hi!' })).to.equal('hi!'); // eslint-disable-line new-cap
    });
  });

  context('when featureLogin is true', () => {
    beforeEach(() => {
      SingleSignOnHandler = requireComponent({ featureLogin: true });
    });

    it('calls userManager.signinSilent() if the user is not valid', () => {
      props.user = null;
      mountComponent();
      expect(signinSilent.called).to.be.true;
    });

    it('calls userManager.signinSilent() if the user is expired', () => {
      props.user.expired = true;
      mountComponent();
      expect(signinSilent.called).to.be.true;
    });

    it('calls userManager.signinRedirect() if userManager.signinSilent() fails', (done) => {
      props.user = null;
      signinSilent.rejects();
      signinRedirect.callsFake(() => {
        expect(signinRedirect.called).to.be.true;
        done();
      });
      mountComponent();
    });

    it('does not call userManager.signinRedirect() if userManager.signinSilent() goes well', () => {
      props.user = null;
      mountComponent();
      expect(signinRedirect.called).to.be.false;
    });

    it('calls fetchPrivilegesIfNeeded if the user is fine', () => {
      mountComponent();
      expect(props.fetchPrivilegesIfNeeded.called).to.be.true;
    });

    it('renders its children if the user is fine', () => {
      const wrapper = mountComponent();
      expect(wrapper).to.have.descendants('#inner');
    });

    it('does not render its children if the user is not valid', () => {
      props.user = null;
      const wrapper = mountComponent();
      expect(wrapper).to.not.have.descendants('#inner');
    });
  });
});
