import styles from './style.postcss';
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ApiCall from 'containers/ApiCalls';
import { Map } from 'immutable';

// eslint-disable-next-line import/no-webpack-loader-syntax
const { ErrorPageHandler, mapStateToProps } = require('inject?./ErrorPage!./')({
  './ErrorPage': () => null,
});

describe('<ErrorPageHandler />', () => {
  describe('component', () => {
    it('renders its children if no failed ApiCall.State is received as erroredApi', () => {
      const wrapper = mount(<ErrorPageHandler><div id="inner" /></ErrorPageHandler>);
      expect(wrapper).to.not.have.descendants(`.${styles.ErrorPageHandler}`);
      expect(wrapper).to.have.descendants('#inner');
    });

    it('renders the error page if a failed ApiCall.State is received as erroredApi', () => {
      const wrapper = mount(<ErrorPageHandler erroredApi={ApiCall.State.createFailed()}>
        <div id="inner" />
      </ErrorPageHandler>);
      expect(wrapper).to.have.descendants(`.${styles.ErrorPageHandler}`);
      expect(wrapper).to.not.have.descendants('#inner');
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

    it('returns erroredApi as undefined if no API has failed', () => {
      expect(mapStateToProps(state, ownProps).erroredApi).to.be.undefined;
    });

    it('returns config as undefined if no route has an errorPage property', () => {
      ownProps.routes = [{}, {}, {}];
      expect(mapStateToProps(state, ownProps).config).to.be.undefined;
    });

    it('returns errorPage in the last route with an errorPage property as config', () => {
      expect(mapStateToProps(state, ownProps).config).to.equal(ownProps.routes[2].errorPage);
    });

    it('returns erroredApi with a failing ApiCall.State if it exists in the state', () => {
      const failedCall = ApiCall.State.createFailed('GET /my/path', new Error());
      state = buildState({
        'GET /my/path': failedCall,
      });
      expect(mapStateToProps(state, ownProps).erroredApi).to.equal(failedCall);
    });
  });
});
