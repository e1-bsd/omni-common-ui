import React from 'react';
import { shallow } from 'enzyme';
import Sinon from 'sinon';
import _Config from 'domain/Config';

describe('<PermissionHandler />', () => {
  // eslint-disable-next-line import/no-webpack-loader-syntax, global-require
  const doRequire = (Config) => require('inject-loader?domain/Config!./')({
    'domain/Config': _Config.merge(Config),
  });

  describe('component', () => {
    let PermissionHandler;

    describe('when featureLogin is not true', () => {
      beforeAll(() => {
        PermissionHandler = doRequire({ featureLogin: false }).PermissionHandler;
      });

      it('renders its children', () => {
        const wrapper = shallow(<PermissionHandler><div id="inner" /></PermissionHandler>);
        expect(wrapper).to.have.descendants('#inner');
      });
    });

    describe('when featureLogin is true', () => {
      beforeAll(() => {
        PermissionHandler = doRequire({ featureLogin: true }).PermissionHandler;
      });

      it('does nothing if no route is provided', () => {
        const wrapper = shallow(<PermissionHandler havePrivilegesLoaded={() => true}>
          <div id="inner" />
        </PermissionHandler>);
        expect(wrapper).toContain(<div id="inner" />);
      });

      it('renders nothing if privileges have not been loaded', () => {
        const wrapper = shallow(<PermissionHandler havePrivilegesLoaded={() => false}>
          <div id="inner" />
        </PermissionHandler>);
        expect(Object.keys(wrapper)).toHaveLength(0);
      });

      it('throws if permissionChecks.canAccess is not a function', () => {
        expect(() => shallow(<PermissionHandler permissionChecks={[{}]}
            havePrivilegesLoaded={() => true} />)).toThrowError();
      });

      it('calls permissionChecks.canAccess passing all props if it is a function', () => {
        const canAccess = Sinon.spy();
        const props = { permissionChecks: [{ canAccess }], havePrivilegesLoaded: () => true };
        shallow(<PermissionHandler {...props} />);
        expect(canAccess.called).toBe(true);
        expect(canAccess.args[0]).toEqual([props]);
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
        expect(props.permissionChecks[0].canAccess.called).toBe(true);
        expect(props.permissionChecks[1].canAccess.called).toBe(true);
        expect(props.permissionChecks[2].canAccess.called).toBe(false);
      });
    });
  });

  describe('mapStateToProps()', () => {
    let mapStateToProps;

    beforeAll(() => {
      mapStateToProps = doRequire({ featureLogin: true }).mapStateToProps;
    });

    it('returns permissionChecks as an array with all routes that have a canAccess()', () => {
      const permissionChecks1 = { canAccess: () => {} };
      const permissionChecks2 = { canAccess: () => {} };
      const routes = [{}, permissionChecks1, {}, permissionChecks2];
      const result = mapStateToProps(null, { routes });
      expect(result.permissionChecks).toEqual([permissionChecks1, permissionChecks2]);
    });

    it('returns permissionChecks as an array with one route ' +
        'if there is only one that has a canAccess()', () => {
      const permissionChecks1 = { canAccess: () => {} };
      const routes = [{}, permissionChecks1, {}];
      const result = mapStateToProps(null, { routes });
      expect(result.permissionChecks).toEqual([permissionChecks1]);
    });

    it('throws if permissionChecks has a canAccess property that is not a function', () => {
      const permissionChecks = { canAccess: '' };
      const routes = [{}, permissionChecks, {}];
      expect(() => mapStateToProps(null, { routes })).toThrowError();
    });

    it('returns permissionChecks as an empty array if no route has canAccess()', () => {
      expect(mapStateToProps(null, { routes: [{}, {}, {}] }).permissionChecks).toEqual([]);
    });
  });
});
