import React from 'react';
import { shallow } from 'enzyme';
import Config from 'domain/Config';
import { PermissionHandler, mapStateToProps } from './';

describe('component', () => {
  describe('when featureLogin is not true', () => {
    beforeEach(() => {
      Config.merge({ featureLogin: false });
    });

    test('renders its children', () => {
      const wrapper = shallow(<PermissionHandler><div id="inner" /></PermissionHandler>);
      expect(wrapper.find('#inner')).toHaveLength(1);
    });
  });

  describe('when featureLogin is true', () => {
    beforeEach(() => {
      Config.merge({ featureLogin: true });
    });

    test('does nothing if no route is provided', () => {
      const wrapper = shallow(<PermissionHandler havePrivilegesLoaded={() => true}>
        <div id="inner" />
      </PermissionHandler>);
      expect(wrapper.contains(<div id="inner" />)).toBe(true);
    });

    test('renders nothing if privileges have not been loaded', () => {
      const wrapper = shallow(<PermissionHandler havePrivilegesLoaded={() => false}>
        <div id="inner" />
      </PermissionHandler>);
      expect(wrapper.html()).toBe(null);
    });

    test('throws if permissionChecks.canAccess is not a function', () => {
      expect(() => shallow(<PermissionHandler permissionChecks={[{}]}
          havePrivilegesLoaded={() => true} />)).toThrowError();
    });

    test('calls permissionChecks.canAccess passing all props if it is a function', () => {
      const canAccess = jest.fn();
      const props = { permissionChecks: [{ canAccess }], havePrivilegesLoaded: () => true };
      shallow(<PermissionHandler {...props} />);
      expect(canAccess).toHaveBeenCalledWith(props);
    });

    test('calls canAccess() for all routes until one returns false', () => {
      const props = {
        permissionChecks: [
          { canAccess: jest.fn().mockReturnValue(true) },
          { canAccess: jest.fn().mockReturnValue(false) },
          { canAccess: jest.fn().mockReturnValue(false) },
        ],
        havePrivilegesLoaded: () => true,
      };
      shallow(<PermissionHandler {...props} />);
      expect(props.permissionChecks[0].canAccess).toHaveBeenCalled();
      expect(props.permissionChecks[1].canAccess).toHaveBeenCalled();
      expect(props.permissionChecks[2].canAccess).not.toHaveBeenCalled();
    });
  });
});

describe('mapStateToProps()', () => {
  beforeEach(() => {
    Config.merge({ featureLogin: true });
  });

  test('returns permissionChecks as an array with all routes that have a canAccess()', () => {
    const permissionChecks1 = { canAccess: () => {} };
    const permissionChecks2 = { canAccess: () => {} };
    const routes = [{}, permissionChecks1, {}, permissionChecks2];
    const result = mapStateToProps(null, { routes });
    expect(result.permissionChecks).toEqual([permissionChecks1, permissionChecks2]);
  });

  test('returns permissionChecks as an array with one route ' +
      'if there is only one that has a canAccess()', () => {
    const permissionChecks1 = { canAccess: () => {} };
    const routes = [{}, permissionChecks1, {}];
    const result = mapStateToProps(null, { routes });
    expect(result.permissionChecks).toEqual([permissionChecks1]);
  });

  test('returns permissionChecks as an empty array if no route has canAccess()', () => {
    expect(mapStateToProps(null, { routes: [{}, {}, {}] }).permissionChecks).toEqual([]);
  });
});
