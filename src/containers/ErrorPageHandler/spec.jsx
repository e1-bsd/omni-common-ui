import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ApiCall from 'containers/ApiCalls';
import { Map, List } from 'immutable';
import Sinon from 'sinon';
import AlertDialog from 'components/AlertDialog';

const ErrorPage = () => null;
// eslint-disable-next-line import/no-webpack-loader-syntax
const { ErrorPageHandler, mapStateToProps } = require('inject?components/ErrorPage!./')({
  'components/ErrorPage': ErrorPage,
});

describe('<ErrorPageHandler />', () => {
  describe('component', () => {
    let props;

    const buildProps = (apiResponse) => {
      const error = new Error();
      error.apiResponse = apiResponse;

      const erroredApi = ApiCall.State.createFailed('id1', error);
      return {
        erroredApis: new List([
          erroredApi,
          ApiCall.State.createFailed('id2', new Error()),
        ]),
        erroredApi,
        clean: Sinon.spy(),
      };
    };

    beforeEach(() => {
      props = buildProps();
    });

    it('renders its children if no failed ApiCall.State is received as erroredApi', () => {
      props.erroredApis = new List();
      props.erroredApi = undefined;
      const wrapper = mount(<ErrorPageHandler {...props}><div id="inner" /></ErrorPageHandler>);
      expect(wrapper).to.have.descendants('#inner');
    });

    it('renders the error page if a failed ApiCall.State is received as erroredApi and has no apiResponse', () => {
      const wrapper = mount(<ErrorPageHandler {...props}><div id="inner" /></ErrorPageHandler>);
      expect(wrapper).to.have.descendants(ErrorPage);
      expect(wrapper).to.not.have.descendants('#inner');
    });

    it('renders the error page if a failed ApiCall.State is received as erroredApi and its code is 500', () => {
      props = buildProps({ code: 500 });
      const wrapper = mount(<ErrorPageHandler {...props}><div id="inner" /></ErrorPageHandler>);
      expect(wrapper).to.have.descendants(ErrorPage);
      expect(wrapper).to.not.have.descendants('#inner');
    });

    it('renders the error dialog if a failed ApiCall.State is received as erroredApi and its code is not 500', () => {
      props = buildProps({ code: 400 });
      const wrapper = mount(<ErrorPageHandler {...props}><div id="inner" /></ErrorPageHandler>);
      expect(wrapper).to.have.descendants(AlertDialog);
      expect(wrapper).to.have.descendants('#inner');
    });

    it('calls clean() for all the failed API calls received', () => {
      const wrapper = mount(<ErrorPageHandler {...props} />);
      const afterButtonClicked = wrapper.find(ErrorPage).prop('afterButtonClicked');
      afterButtonClicked();
      expect(props.clean.args).to.eql([['id1'], ['id2']]);
    });
  });

  describe('mapStateToProps', () => {
    let state;
    let ownProps;

    const buildState = (apiCalls = {}) => new Map({
      apiCalls: new Map({
        'GET /some/path': ApiCall.State.createLoading(),
      }).merge(apiCalls),
    });

    beforeEach(() => {
      state = buildState();
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
  });
});
