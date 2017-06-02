'use strict';

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ApiCall', function () {
  describe('ApiAction', function () {
    var log = void 0;
    var ApiAction = void 0;

    var buildAction = function buildAction() {
      var configParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.assign({}, {
        type: 'CALL_FAILURE',
        error: new Error(),
        url: '/some/path',
        method: 'GET'
      }, configParam);
    };

    beforeEach(function () {
      log = { error: _sinon2.default.spy() };
      // eslint-disable-next-line global-require, import/no-webpack-loader-syntax
      ApiAction = require('inject-loader?domain/log!./ApiAction')({
        'domain/log': log
      }).default;
    });

    it('throws an error if nothing is passed', function () {
      (0, _chai.expect)(function () {
        return ApiAction.create();
      }).to.throw();
    });

    it('throws an error if a parameter that is not an object is passed', function () {
      (0, _chai.expect)(function () {
        return ApiAction.create('some string');
      }).to.throw();
    });

    it('throws an error if the action does not have a url property', function () {
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ url: undefined }));
      }).to.throw();
    });

    it('throws an error if the url property is not a string', function () {
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ url: {} }));
      }).to.throw();
    });

    it('throws an error if the action does not have a method proptery', function () {
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ method: undefined }));
      }).to.throw();
    });

    it('throws an error if the method property is not GET, PUT, POST or DELETE', function () {
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ method: 'some string' }));
      }).to.throw();
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ method: 'GET' }));
      }).to.not.throw();
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ method: 'PUT' }));
      }).to.not.throw();
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ method: 'POST' }));
      }).to.not.throw();
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ method: 'DELETE' }));
      }).to.not.throw();
    });

    it('throws an error if the action does not have a type proptery', function () {
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ type: undefined }));
      }).to.throw();
    });

    it('throws an error if the type proptery has lower case letters', function () {
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ type: 'Call_REQUEST' }));
      }).to.throw();
    });

    it('throws an error ' + 'if the type property does not end with _REQUEST, _SUCCESS or _FAILURE', function () {
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ type: 'some string' }));
      }).to.throw();
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ type: 'CALL_REQUEST' }));
      }).to.not.throw();
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ type: 'CALL_SUCCESS' }));
      }).to.not.throw();
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ type: 'CALL_FAILURE' }));
      }).to.not.throw();
    });

    it('returns the wrapped action if the provided one is valid', function () {
      var action = ApiAction.create(buildAction());
      (0, _chai.expect)(action.url).to.equal('/some/path');
      (0, _chai.expect)(action.method).to.equal('GET');
    });

    it('does not return the same object instance it receives', function () {
      var originalAction = buildAction();
      var action = ApiAction.create(originalAction);
      (0, _chai.expect)(originalAction).to.not.equal(action);
    });

    it('converts the provided URL to lower case', function () {
      var action = ApiAction.create(buildAction({ url: '/some/Path' }));
      (0, _chai.expect)(action.url).to.equal('/some/path');
    });

    it('converts the provided method to upper case', function () {
      var action = ApiAction.create(buildAction({ method: 'get' }));
      (0, _chai.expect)(action.method).to.equal('GET');
    });

    it('allows to access all the properties of the original action', function () {
      var callAction = ApiAction.create(buildAction({ otherProp: 1 }));
      (0, _chai.expect)(callAction.otherProp).to.equal(1);
    });

    it('throws an error if a _FAILURE action does not have an error property', function () {
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ error: undefined }));
      }).to.throw();
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ error: null }));
      }).to.throw();
      (0, _chai.expect)(function () {
        return ApiAction.create(buildAction({ error: '' }));
      }).to.not.throw();
    });

    it('converts action.error into an instance of Error if it\'s not already the case', function () {
      (0, _chai.expect)(ApiAction.create(buildAction({ error: '' })).error).to.be.an.instanceof(Error);
    });

    it('logs the error of a failure action', function () {
      var error = new Error('an error');
      ApiAction.create(buildAction({ error: error }));
      (0, _chai.expect)(log.error.args).to.eql([[error]]);
    });

    context('#isApiAction()', function () {
      it('returns true an action was created with ApiAction.create()', function () {
        var originalAction = buildAction({ type: 'CALL_REQUEST' });
        var callAction = ApiAction.create(originalAction);
        (0, _chai.expect)(ApiAction.isApiAction(callAction)).to.equal(true, 'api action');
        (0, _chai.expect)(ApiAction.isApiAction(originalAction)).to.equal(false, 'original action');
      });
    });

    context('#isStarted()', function () {
      it('returns true if action.type ends with _REQUEST', function () {
        var callAction = ApiAction.create(buildAction({ type: 'CALL_REQUEST' }));
        (0, _chai.expect)(ApiAction.isStarted(callAction)).to.be.true;
        (0, _chai.expect)(ApiAction.isSuccess(callAction)).to.be.false;
        (0, _chai.expect)(ApiAction.isFailure(callAction)).to.be.false;
      });
    });

    context('#isSuccess()', function () {
      it('returns true if action.type ends with _SUCCESS', function () {
        var callAction = ApiAction.create(buildAction({ type: 'CALL_SUCCESS' }));
        (0, _chai.expect)(ApiAction.isStarted(callAction)).to.be.false;
        (0, _chai.expect)(ApiAction.isSuccess(callAction)).to.be.true;
        (0, _chai.expect)(ApiAction.isFailure(callAction)).to.be.false;
      });
    });

    context('#isFailure()', function () {
      it('returns true if action.type ends with _FAILURE', function () {
        var callAction = ApiAction.create(buildAction());
        (0, _chai.expect)(ApiAction.isStarted(callAction)).to.be.false;
        (0, _chai.expect)(ApiAction.isSuccess(callAction)).to.be.false;
        (0, _chai.expect)(ApiAction.isFailure(callAction)).to.be.true;
      });
    });
  });
});
//# sourceMappingURL=ApiAction.spec.js.map
