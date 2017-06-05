import _Config from 'domain/Config';
import { Map, List } from 'immutable';

// eslint-disable-next-line import/no-webpack-loader-syntax, global-require
const requireChecker = (Config) => require('inject-loader?domain/Config!./')({
  'domain/Config': _Config.merge(Config),
}).default;

describe('PrivilegeChecker', () => {
  let PrivilegeChecker;
  let state;

  beforeEach(() => {
    state = new Map({ privileges: { items: new List(['pr1', 'pr2', 'PREFIX_pr3']) } });
    PrivilegeChecker = requireChecker({ featureLogin: true });
  });

  it('returns false if the privilege is not a string', () => {
    expect(PrivilegeChecker.hasPrivilege(state, 1)).toBe(false);
  });

  it('throws if something else rather than a Map is provided as a state', () => {
    expect(() => PrivilegeChecker.hasPrivilege({}, '')).to.throw;
  });

  it('returns false if the state is malformed', () => {
    expect(PrivilegeChecker.hasPrivilege(Map(), 'pr1')).toBe(false);
    expect(PrivilegeChecker.hasPrivilege(Map({ privileges: null }), 'pr1')).toBe(false);
    expect(PrivilegeChecker.hasPrivilege(Map({ privileges: Map() }), 'pr1')).toBe(false);
  });

  it('returns true if the privilege is found in the privilege list', () => {
    expect(PrivilegeChecker.hasPrivilege(state, 'pr1')).toBe(true);
  });

  it('returns true even if the privilege is provided with a different case', () => {
    expect(PrivilegeChecker.hasPrivilege(state, 'PR1')).toBe(true);
  });

  it('returns true if there is a privilege in the list that ends with the provided string', () => {
    expect(PrivilegeChecker.hasPrivilege(state, 'pr3')).toBe(true);
  });

  describe('when featureLogin is not true', () => {
    beforeEach(() => {
      PrivilegeChecker = requireChecker({ featureLogin: false });
    });

    it('returns true', () => {
      expect(PrivilegeChecker.hasPrivilege()).toBe(true);
    });
  });
});
