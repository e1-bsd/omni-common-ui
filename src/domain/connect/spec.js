import connect from './';
import { connect as originalConnect } from 'react-redux';
import { createBuildRoute } from 'domain/createBuildRoute';
import { bindActionCreators } from 'redux';
import { routerActions } from 'react-router-redux';

jest.mock('react-redux', () => ({ connect: jest.fn() }));
jest.mock('domain/createBuildRoute', () => ({ createBuildRoute: () => 'buildRouteMock' }));
jest.mock('redux', () => ({ bindActionCreators: (arg) => arg }));
jest.mock('react-router-redux', () => ({ routerActions: { push: jest.fn(), replace: jest.fn() } }));

beforeEach(() => {
  jest.resetAllMocks();
});

test('calls Redux\'s connect() function', () => {
  connect();
  expect(originalConnect).toHaveBeenCalled();
});

test('passes buildRoute and any other stuff to Redux\'s connect() in mapStateToProps', () => {
  connect(() => ({ someProp: 'someValue' }));
  const mapStateToProps = originalConnect.mock.calls[0][0];
  expect(mapStateToProps().buildRoute).toBe(createBuildRoute());
  expect(mapStateToProps().someProp).toBe('someValue');
});

test('ignores mapStateToProps if it is not a function ', () => {
  connect('bad mapStateToProps');
  const mapStateToProps = originalConnect.mock.calls[0][0];
  expect(mapStateToProps()).toEqual({ buildRoute: createBuildRoute() });
});

test('passes bound router actions and any other stuff to Redux\'s connect() in mapDispatchToProps', () => {
  const boundActions = bindActionCreators(routerActions);
  connect(null, () => ({ someProp: 'someValue' }));
  const mapDispatchToProps = originalConnect.mock.calls[0][1];
  expect(mapDispatchToProps()).toMatchObject(boundActions);
  expect(mapDispatchToProps().someProp).toBe('someValue');
});

test('ignores mapDispatchToProps if it is not a function ', () => {
  const boundActions = bindActionCreators(routerActions);
  connect(null, 'bad mapStateToProps');
  const mapDispatchToProps = originalConnect.mock.calls[0][1];
  expect(mapDispatchToProps()).toEqual(boundActions);
});

test('passes mergeProps directly', () => {
  const mergeProps = () => {};
  connect(null, null, mergeProps);
  expect(originalConnect.mock.calls[0][2]).toBe(mergeProps);
});

test('passes options directly', () => {
  const options = {};
  connect(null, null, null, options);
  expect(originalConnect.mock.calls[0][3]).toBe(options);
});
