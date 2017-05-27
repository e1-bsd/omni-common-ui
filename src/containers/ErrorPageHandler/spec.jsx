import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ApiCall from 'containers/ApiCalls';
import { Map, List } from 'immutable';
import Sinon from 'sinon';
import AlertDialog from 'components/AlertDialog';
import _Config from 'domain/Config';
import { ApiError } from 'domain/Api';
import is from 'is_js';

const ErrorPage = () => null;
// eslint-disable-next-line import/no-webpack-loader-syntax, global-require
const requireComponent = (Config) => require('inject?components/ErrorPage&domain/Config!./')({
  'components/ErrorPage': ErrorPage,
  'domain/Config': _Config.merge(Config),
});

const getComponent = (Config) => requireComponent(Config).ErrorPageHandler;
const getMapStateToProps = (Config) => requireComponent(Config).mapStateToProps;

describe('<ErrorPageHandler />', () => {
  describe('component', () => {
    let props;
    let ErrorPageHandler;

    const buildProps = (response = {}) => {
      const error = new ApiError(response);
      if (is.not.undefined(response.response)) {
        error.response = response.response;
      }

      const erroredApi = ApiCall.State.createFailed('id1', error);
      return {
        erroredApis: new List([
          erroredApi,
          ApiCall.State.createFailed('id2', new Error()),
        ]),
        erroredApi,
        clean: Sinon.spy(),
        location: {
          pathname: '/x/y',
        },
      };
    };

    beforeEach(() => {
      props = buildProps();
      ErrorPageHandler = getComponent();
    });

    it('renders its children if no failed ApiCall.State is received as erroredApi', () => {
      props.erroredApis = new List();
      props.erroredApi = undefined;
      const wrapper = mount(<ErrorPageHandler {...props}><div id="inner" /></ErrorPageHandler>);
      expect(wrapper).to.have.descendants('#inner');
    });

    it('renders the error page if a failed ApiCall.State is received as erroredApi and has no response', () => {
      const wrapper = mount(<ErrorPageHandler {...props}><div id="inner" /></ErrorPageHandler>);
      expect(wrapper).to.have.descendants(ErrorPage);
      expect(wrapper).to.not.have.descendants('#inner');
    });

    context('when location.pathname changes, API errors are auto-cleaned', () => {
      it('does not call clean() on mount', () => {
        mount(<ErrorPageHandler {...props} />);
        expect(props.clean.called).to.be.false;
      });

      it('does not call clean() if location.pathname is the same', () => {
        const wrapper = mount(<ErrorPageHandler {...props} />);
        wrapper.setProps({ location: { pathname: '/x/y' } });
        expect(props.clean.called).to.be.false;
      });

      it('calls clean() on location.pathname change', () => {
        const wrapper = mount(<ErrorPageHandler {...props} />);
        wrapper.setProps({ location: { pathname: '/x' } });  // user clicked a nav crumb, for instance
        expect(props.clean.args).to.eql([['id1'], ['id2']]);
      });
    });

    context('when errorHandlerRendersPopUps config option is true', () => {
      beforeEach(() => {
        ErrorPageHandler = getComponent(Map({ errorHandlerRendersPopUps: true }));
      });

      it('renders the error page if a failed ApiCall.State is received as erroredApi and its code is 500', () => {
        props = buildProps({ status: 500 });
        const wrapper = mount(<ErrorPageHandler {...props}><div id="inner" /></ErrorPageHandler>);
        expect(wrapper).to.have.descendants(ErrorPage);
        expect(wrapper).to.not.have.descendants('#inner');
      });

      it('renders the error dialog if a failed ApiCall.State is received as erroredApi ' +
          'and its code is not 500 and there is an object in the response property', () => {
        props = buildProps({ status: 400, response: {} });
        const wrapper = mount(<ErrorPageHandler {...props}><div id="inner" /></ErrorPageHandler>);
        expect(wrapper).to.have.descendants(AlertDialog);
        expect(wrapper).to.have.descendants('#inner');
      });

      it('does not the error dialog if a failed ApiCall.State is received as erroredApi ' +
          'and its code is not 500 but there is not an object in the response property', () => {
        props = buildProps({ status: 400, response: 'Some string' });
        const wrapper = mount(<ErrorPageHandler {...props}><div id="inner" /></ErrorPageHandler>);
        expect(wrapper).to.have.descendants(ErrorPage);
        expect(wrapper).to.not.have.descendants('#inner');
      });
    });

    context('when errorHandlerRendersPopUps config option is not true', () => {
      beforeEach(() => {
        ErrorPageHandler = getComponent(Map({ errorHandlerRendersPopUps: false }));
      });

      it('renders the error page if a failed ApiCall.State is received as erroredApi and its code is 500', () => {
        props = buildProps({ status: 500 });
        const wrapper = mount(<ErrorPageHandler {...props}><div id="inner" /></ErrorPageHandler>);
        expect(wrapper).to.have.descendants(ErrorPage);
        expect(wrapper).to.not.have.descendants('#inner');
      });

      it('renders the error page if a failed ApiCall.State is received as erroredApi and its code is not 500', () => {
        props = buildProps({ status: 400 });
        const wrapper = mount(<ErrorPageHandler {...props}><div id="inner" /></ErrorPageHandler>);
        expect(wrapper).to.have.descendants(ErrorPage);
        expect(wrapper).to.not.have.descendants('#inner');
      });
    });
  });

  describe('mapStateToProps', () => {
    let state;
    let ownProps;
    let mapStateToProps;

    const buildState = (apiCalls = {}) => new Map({
      apiCalls: new Map({
        'GET /some/path': ApiCall.State.createLoading(),
      }).merge(apiCalls),
    });

    beforeEach(() => {
      state = buildState();
      mapStateToProps = getMapStateToProps();
      ownProps = {
        routes: [
          {},
          { errorPage: {} },
          { errorPage: {} },
        ],
      };
    });

    it('returns erroredApis as empty List if no API has failed', () => {
      const { erroredApis } = mapStateToProps(state, ownProps);
      expect(List.isList(erroredApis)).to.equal(true, 'is a List');
      expect(erroredApis.isEmpty()).to.equal(true, 'is empty');
    });

    it('returns config as undefined if no route has an errorPage property', () => {
      ownProps.routes = [{}, {}, {}];
      expect(mapStateToProps(state, ownProps).config).to.be.undefined;
    });

    it('returns errorPage in the last route with an errorPage property as config', () => {
      expect(mapStateToProps(state, ownProps).config).to.equal(ownProps.routes[2].errorPage);
    });

    it('returns erroredApis with failing a list of ApiCall.State ' +
        'if they exist in the state', () => {
      const failedCall1 = ApiCall.State.createFailed('GET /my/path', new Error());
      const failedCall2 = ApiCall.State.createFailed('GET /my/path/2', new Error());
      state = buildState({
        'GET /my/path': failedCall1,
        'GET /my/path/2': failedCall2,
      });
      expect(mapStateToProps(state, ownProps).erroredApis.get(0)).to.equal(failedCall1);
      expect(mapStateToProps(state, ownProps).erroredApis.get(1)).to.equal(failedCall2);
    });

    it('ignores errores APIs if disableDefault=true for them', () => {
      const failedCall1 = ApiCall.State.createFailed('GET /my/path', new Error());
      const failedCall2 = ApiCall.State.createFailed('GET /my/path/2', new Error(), { disableDefault: true });
      state = buildState({
        'GET /my/path': failedCall1,
        'GET /my/path/2': failedCall2,
      });
      const { erroredApis } = mapStateToProps(state, ownProps);
      expect(erroredApis.size).to.equal(1);
      expect(erroredApis.get(0)).to.equal(failedCall1);
    });
  });
});
