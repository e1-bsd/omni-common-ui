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

    it('does nothing if shouldRedirect.checkPrivileges is not a function', () => {
      expect(() => shallow(<PermissionHandler shouldRedirect={{}} />))
          .to.not.throw();
    });

    it('calls shouldRedirect.checkPrivileges passing all props if it is a function', () => {
      const checkPrivileges = Sinon.spy();
      const props = { shouldRedirect: { checkPrivileges } };
      shallow(<PermissionHandler {...props} />);
      expect(checkPrivileges.called).to.be.true;
      expect(checkPrivileges.args[0]).to.eql([props]);
    });
  });

  describe('mapStateToProps()', () => {
    it('returns shouldRedirect with the first route having checkPrivileges()', () => {
      const shouldRedirect1 = { checkPrivileges: () => {} };
      const shouldRedirect2 = { checkPrivileges: () => {} };
      const routes = [{}, shouldRedirect1, {}, shouldRedirect2];
      const result = mapStateToProps(null, { routes });
      expect(result.shouldRedirect).to.equal(shouldRedirect1);
      expect(result.shouldRedirect).to.not.equal(shouldRedirect2);
    });

    it('throws if shouldRedirect has a checkPrivileges property that is not a function', () => {
      const shouldRedirect = { checkPrivileges: '' };
      const routes = [{}, shouldRedirect, {}];
      expect(() => mapStateToProps(null, { routes })).to.throw();
    });

    it('returns shouldRedirect as undefined if no route has checkPrivileges()', () => {
      expect(mapStateToProps(null, { routes: [{}, {}, {}] }).shouldRedirect).to.be.undefined;
    });
  });
});
