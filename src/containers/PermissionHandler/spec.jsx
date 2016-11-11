import React from 'react';
import { PermissionHandler, mapStateToProps } from './';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Sinon from 'sinon';

describe('<PermissionHandler />', () => {
  describe('component', () => {
    it('does nothing if no route is provided', () => {
      const wrapper = shallow(<PermissionHandler><div id="inner" /></PermissionHandler>);
      expect(wrapper).to.contain(<div id="inner" />);
    });

    it('throws if shouldRedirect.checkPrivileges is not a function', () => {
      expect(() => shallow(<PermissionHandler shouldRedirect={{}} />))
          .to.throw();
    });

    it('calls shouldRedirect.checkPrivileges passing all props if it is a function', () => {
      const checkPrivileges = Sinon.spy();
      const props = { shouldRedirect: [{ checkPrivileges }] };
      shallow(<PermissionHandler {...props} />);
      expect(checkPrivileges.called).to.be.true;
      expect(checkPrivileges.args[0]).to.eql([props]);
    });

    it('calls checkPrivileges() for all routes until one returns true', () => {
      const props = {
        shouldRedirect: [
          { checkPrivileges: Sinon.stub().returns(false) },
          { checkPrivileges: Sinon.stub().returns(true) },
          { checkPrivileges: Sinon.stub().returns(true) },
        ],
      };
      shallow(<PermissionHandler {...props} />);
      expect(props.shouldRedirect[0].checkPrivileges.called).to.equal(true, 'first');
      expect(props.shouldRedirect[1].checkPrivileges.called).to.equal(true, 'second');
      expect(props.shouldRedirect[2].checkPrivileges.called).to.equal(false, 'third');
    });
  });

  describe('mapStateToProps()', () => {
    it('returns shouldRedirect as an array with all routes that have a checkPrivileges()', () => {
      const shouldRedirect1 = { checkPrivileges: () => {} };
      const shouldRedirect2 = { checkPrivileges: () => {} };
      const routes = [{}, shouldRedirect1, {}, shouldRedirect2];
      const result = mapStateToProps(null, { routes });
      expect(result.shouldRedirect).to.eql([shouldRedirect1, shouldRedirect2]);
    });

    it('returns shouldRedirect as an array with one route ' +
        'if there is only one that has a checkPrivileges()', () => {
      const shouldRedirect1 = { checkPrivileges: () => {} };
      const routes = [{}, shouldRedirect1, {}];
      const result = mapStateToProps(null, { routes });
      expect(result.shouldRedirect).to.eql([shouldRedirect1]);
    });

    it('throws if shouldRedirect has a checkPrivileges property that is not a function', () => {
      const shouldRedirect = { checkPrivileges: '' };
      const routes = [{}, shouldRedirect, {}];
      expect(() => mapStateToProps(null, { routes })).to.throw();
    });

    it('returns shouldRedirect as an empty array if no route has checkPrivileges()', () => {
      expect(mapStateToProps(null, { routes: [{}, {}, {}] }).shouldRedirect).to.eql([]);
    });
  });
});
