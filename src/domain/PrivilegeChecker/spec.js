import { Map, List } from 'immutable';
import Config from 'domain/Config';
import PrivilegeChecker from './';

let state;

beforeEach(() => {
  state = new Map({ privileges: { items: new List(['pr1', 'pr2', 'PREFIX_pr3']) } });
  Config.merge({ featureLogin: true });
});

test('returns false if the privilege is not a string', () => {
  expect(PrivilegeChecker.hasPrivilege(state, 1)).toBe(false);
});

test('throws if something else rather than a Map is provided as a state', () => {
  expect(() => PrivilegeChecker.hasPrivilege({}, 'pr1')).toThrow();
});

test('returns false if the state is malformed', () => {
  expect(PrivilegeChecker.hasPrivilege(Map(), 'pr1')).toBe(false);
  expect(PrivilegeChecker.hasPrivilege(Map({ privileges: null }), 'pr1')).toBe(false);
  expect(PrivilegeChecker.hasPrivilege(Map({ privileges: Map() }), 'pr1')).toBe(false);
});

test('returns true if the privilege is found in the privilege list', () => {
  expect(PrivilegeChecker.hasPrivilege(state, 'pr1')).toBe(true);
});

test('returns true even if the privilege is provided with a different case', () => {
  expect(PrivilegeChecker.hasPrivilege(state, 'PR1')).toBe(true);
});

test('returns true if there is a privilege in the list that ends with the provided string', () => {
  expect(PrivilegeChecker.hasPrivilege(state, 'pr3')).toBe(true);
});

describe('when featureLogin is not true', () => {
  beforeEach(() => {
    Config.merge({ featureLogin: false });
  });

  test('returns true', () => {
    expect(PrivilegeChecker.hasPrivilege()).toBe(true);
  });
});
