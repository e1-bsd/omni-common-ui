import React from 'react';
import { PermissionHandler, mapStateToProps } from './';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Sinon from 'sinon';

describe('<PermissionHandler />', () => {
  describe('component', () => {
    it('does nothing if no route is provided', () => {
      const wrapper = shallow(<PermissionHandler havePrivilegesLoaded={() => true}>
        <div id="inner" />
      </PermissionHandler>);
      expect(wrapper).to.contain(<div id="inner" />);
    });

    it('renders nothing if privileges have not been loaded', () => {
      const wrapper = shallow(<PermissionHandler havePrivilegesLoaded={() => false}>
        <div id="inner" />
      </PermissionHandler>);
      expect(wrapper).to.be.empty;
    });

    it('throws if permissionChecks.canAccess is not a function', () => {
      expect(() => shallow(<PermissionHandler permissionChecks={[{}]}
          havePrivilegesLoaded={() => true} />)).to.throw();
    });

    it('calls permissionChecks.canAccess passing all props if it is a function', () => {
      const canAccess = Sinon.spy();
      const props = { permissionChecks: [{ canAccess }], havePrivilegesLoaded: () => true };
      shallow(<PermissionHandler {...props} />);
      expect(canAccess.called).to.be.true;
      expect(canAccess.args[0]).to.eql([props]);
    });

    it('calls canAccess() for all routes until one returns false', () => {
      const props = {
        permissionChecks: [
          { canAccess: Sinon.stub().returns(true) },
          { canAccess: Sinon.stub().returns(false) },
          { canAccess: Sinon.stub().returns(false) },
        ],
        havePrivilegesLoaded: () => true,
      };
      shallow(<PermissionHandler {...props} />);
      expect(props.permissionChecks[0].canAccess.called).to.equal(true, 'first');
      expect(props.permissionChecks[1].canAccess.called).to.equal(true, 'second');
      expect(props.permissionChecks[2].canAccess.called).to.equal(false, 'third');
    });
  });

  describe('mapStateToProps()', () => {
    it('returns permissionChecks as an array with all routes that have a canAccess()', () => {
      const permissionChecks1 = { canAccess: () => {} };
      const permissionChecks2 = { canAccess: () => {} };
      const routes = [{}, permissionChecks1, {}, permissionChecks2];
      const result = mapStateToProps(null, { routes });
      expect(result.permissionChecks).to.eql([permissionChecks1, permissionChecks2]);
    });

    it('returns permissionChecks as an array with one route ' +
        'if there is only one that has a canAccess()', () => {
      const permissionChecks1 = { canAccess: () => {} };
      const routes = [{}, permissionChecks1, {}];
      const result = mapStateToProps(null, { routes });
      expect(result.permissionChecks).to.eql([permissionChecks1]);
    });

    it('throws if permissionChecks has a canAccess property that is not a function', () => {
      const permissionChecks = { canAccess: '' };
      const routes = [{}, permissionChecks, {}];
      expect(() => mapStateToProps(null, { routes })).to.throw();
    });

    it('returns permissionChecks as an empty array if no route has canAccess()', () => {
      expect(mapStateToProps(null, { routes: [{}, {}, {}] }).permissionChecks).to.eql([]);
    });
  });
});
