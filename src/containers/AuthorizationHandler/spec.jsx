import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import Config from 'domain/Config';
import { AuthorizationHandler, mapStateToProps } from './';

let baseProps;

const getComponent = (kids = null, extraProps = {}) =>
  shallow(<AuthorizationHandler {...baseProps}
      {...extraProps}>
    {kids}
  </AuthorizationHandler>);

const state = new Map({
  singleSignOn: new Map({
    user: new Map(),
  }),
});

beforeEach(() => {
  baseProps = {
    fetchPrivilegesIfNeeded: jest.fn(),
    user: new Map({
      expired: false,
      profile: {
        sub: '123',
      },
    }),
  };
});

describe('component', () => {
  describe('when featureLogin is not true', () => {
    beforeEach(() => {
      Config.merge({ featureLogin: false });
    });

    test('renders its children', () => {
      const wrapper = getComponent(<div id="inner" />);
      expect(wrapper.find('#inner')).toHaveLength(1);
    });

    test('does not call fetchPrivilegesIfNeeded even if the user is fine', () => {
      getComponent();
      expect(baseProps.fetchPrivilegesIfNeeded).not.toHaveBeenCalled();
    });

    test('renders its children if the user is fine', () => {
      const wrapper = getComponent(<div id="inner" />);
      expect(wrapper.find('#inner')).toHaveLength(1);
    });

    test('renders its children even if the user is not valid', () => {
      baseProps.user = null;
      const wrapper = getComponent(<div id="inner" />);
      expect(wrapper.find('#inner')).toHaveLength(1);
    });
  });

  describe('when featureLogin is true', () => {
    beforeEach(() => {
      Config.merge({ featureLogin: true });
    });

    test('does nothing if no route is provided', () => {
      const wrapper = getComponent(<div id="inner" />, { havePrivilegesLoaded: () => true });
      expect(wrapper.contains(<div id="inner" />)).toBe(true);
    });

    test('renders a loading spinner if privileges have not been loaded', () => {
      const wrapper = getComponent(<div id="inner" />, { havePrivilegesLoaded: () => false });
      expect(wrapper.contains(<div className="pace"><div className="pace-activity" /></div>)).toBe(true);
    });

    test('throws if permissionChecks.canAccess is not a function', () => {
      expect(() =>
        getComponent(null, { havePrivilegesLoaded: () => true, permissionChecks: [{}] })
      ).toThrowError();
    });

    test('calls permissionChecks.canAccess passing all props if it is a function', () => {
      const canAccess = jest.fn();
      const props = { permissionChecks: [{ canAccess }], havePrivilegesLoaded: () => true };
      getComponent(null, props);
      expect(canAccess).toHaveBeenCalledWith(
          Object.assign({ children: null }, baseProps, props));
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
      getComponent(null, props);
      expect(props.permissionChecks[0].canAccess).toHaveBeenCalled();
      expect(props.permissionChecks[1].canAccess).toHaveBeenCalled();
      expect(props.permissionChecks[2].canAccess).not.toHaveBeenCalled();
    });

    test('calls fetchPrivilegesIfNeeded if the user is fine but permissions have not loaded', () => {
      baseProps.havePrivilegesLoaded = () => false;
      getComponent();
      expect(baseProps.fetchPrivilegesIfNeeded).toHaveBeenCalled();
    });

    test('renders its children if the user is fine and permissions have loaded', () => {
      baseProps.havePrivilegesLoaded = () => true;
      const wrapper = getComponent(<div id="inner" />);
      expect(wrapper.find('#inner')).toHaveLength(1);
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
    const result = mapStateToProps(state, { routes });
    expect(result.permissionChecks).toEqual([permissionChecks1, permissionChecks2]);
  });

  test('returns permissionChecks as an array with one route ' +
      'if there is only one that has a canAccess()', () => {
    const permissionChecks1 = { canAccess: () => {} };
    const routes = [{}, permissionChecks1, {}];
    const result = mapStateToProps(state, { routes });
    expect(result.permissionChecks).toEqual([permissionChecks1]);
  });

  test('returns permissionChecks as an empty array if no route has canAccess()', () => {
    expect(mapStateToProps(state, { routes: [{}, {}, {}] }).permissionChecks).toEqual([]);
  });
});
