'use strict';

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <Breadcrumbs state params location routes buildRoute>

describe('BreadcrumbsBuilder', function () {
  var props = {
    params: undefined,
    location: undefined,
    routes: undefined,
    buildRoute: undefined
  };

  var expectedItems = void 0;

  beforeEach(function () {
    props.params = {};
    props.location = {};
    props.routes = [];
    props.buildRoute = function (path) {
      return '/' + path;
    };
    expectedItems = undefined;
  });

  context('breadcrumb rendering', function () {
    it('when there are no labelled route segments', function () {
      props.routes = [{
        path: '/group/1'
      }];
      var result = _2.default.buildWithProps(props);
      (0, _chai.expect)(result).to.be.eql([]);
    });

    it('when there is one labelled route segment', function () {
      props.routes = [{
        path: 'group/:groupId',
        breadcrumbLabels: 'Group'
      }];
      expectedItems = [{
        label: 'Group',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null
      }];
      var result = _2.default.buildWithProps(props);
      (0, _chai.expect)(result).to.be.eql(expectedItems);
    });

    it('with two items when there are two labelled route segments', function () {
      props.routes = [{
        path: 'group/:groupId',
        breadcrumbLabels: 'Group'
      }, {
        path: 'dashboard'
      }, {
        path: 'members',
        breadcrumbLabels: 'Members'
      }];
      expectedItems = [{
        label: 'Group',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null
      }, {
        label: 'Members',
        href: '/group/:groupId/dashboard/members',
        clickable: false,
        hidden: false,
        backLinkHref: null
      }];
      var result = _2.default.buildWithProps(props);
      (0, _chai.expect)(result).to.be.eql(expectedItems);
    });

    it('with more labels than routes when label value(s) are arrays', function () {
      props.routes = [{
        path: 'group/:groupId',
        breadcrumbLabels: ['Home', 'Group']
      }, {
        path: 'members',
        breadcrumbLabels: 'Members'
      }];
      expectedItems = [{
        label: 'Home',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null
      }, {
        label: 'Group',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null
      }, {
        label: 'Members',
        href: '/group/:groupId/members',
        clickable: false,
        hidden: false,
        backLinkHref: null
      }];
      var result = _2.default.buildWithProps(props);
      (0, _chai.expect)(result).to.be.eql(expectedItems);
    });

    it('with labels that are functions', function () {
      props.params = {
        groupId: '10'
      };
      props.routes = [{
        path: 'group/:groupId',
        breadcrumbLabels: function breadcrumbLabels(_ref) {
          var groupId = _ref.params.groupId;
          return 'Group ' + groupId;
        }
      }, {
        path: 'members',
        breadcrumbLabels: function breadcrumbLabels() {
          return 'Members';
        }
      }];
      expectedItems = [{
        label: 'Group 10',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null
      }, {
        label: 'Members',
        href: '/group/:groupId/members',
        clickable: false,
        hidden: false,
        backLinkHref: null
      }];
      var result = _2.default.buildWithProps(props);
      (0, _chai.expect)(result).to.be.eql(expectedItems);
    });

    it('with labels of mixed types containing a full object definition', function () {
      props.params = {
        groupId: '10'
      };
      props.routes = [{
        path: 'group/:groupId',
        breadcrumbLabels: 'Group'
      }, {
        path: 'members/edit',
        breadcrumbLabels: function breadcrumbLabels() {
          return [{
            label: 'Members',
            href: '/group/:groupId/members',
            clickable: false,
            hidden: true,
            backLinkHref: '/'
          }, 'Edit'];
        }
      }];
      expectedItems = [{
        label: 'Group',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null
      }, {
        label: 'Members',
        href: '/group/:groupId/members',
        clickable: false,
        hidden: true,
        backLinkHref: '/'
      }, {
        label: 'Edit',
        href: '/group/:groupId/members/edit',
        clickable: false,
        hidden: false,
        backLinkHref: null
      }];
      var result = _2.default.buildWithProps(props);
      (0, _chai.expect)(result).to.be.eql(expectedItems);
    });
  });
});
//# sourceMappingURL=spec.js.map
