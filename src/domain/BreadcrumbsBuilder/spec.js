import { expect } from 'chai';
import BreadcrumbsBuilder from './';

// <Breadcrumbs state params location routes buildRoute>

describe('BreadcrumbsBuilder', () => {
  const props = {
    params: undefined,
    location: undefined,
    routes: undefined,
    buildRoute: undefined,
  };

  let expectedItems;

  beforeEach(() => {
    props.params = {};
    props.location = {};
    props.routes = [];
    props.buildRoute = (path) => `/${path}`;
    expectedItems = undefined;
  });

  context('breadcrumb rendering', () => {
    it('when there are no labelled route segments', () => {
      props.routes = [{
        path: '/group/1',
      }];
      const result = BreadcrumbsBuilder.buildWithProps(props);
      expect(result).to.be.eql([]);
    });

    it('when there is one labelled route segment', () => {
      props.routes = [{
        path: 'group/:groupId',
        breadcrumbLabels: 'Group',
      }];
      expectedItems = [{
        label: 'Group',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null,
      }];
      const result = BreadcrumbsBuilder.buildWithProps(props);
      expect(result).to.be.eql(expectedItems);
    });

    it('with two items when there are two labelled route segments', () => {
      props.routes = [{
        path: 'group/:groupId',
        breadcrumbLabels: 'Group',
      }, {
        path: 'dashboard',
      }, {
        path: 'members',
        breadcrumbLabels: 'Members',
      }];
      expectedItems = [{
        label: 'Group',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null,
      }, {
        label: 'Members',
        href: '/group/:groupId/dashboard/members',
        clickable: false,
        hidden: false,
        backLinkHref: null,
      }];
      const result = BreadcrumbsBuilder.buildWithProps(props);
      expect(result).to.be.eql(expectedItems);
    });

    it('with more labels than routes when label value(s) are arrays', () => {
      props.routes = [{
        path: 'group/:groupId',
        breadcrumbLabels: ['Home', 'Group'],
      }, {
        path: 'members',
        breadcrumbLabels: 'Members',
      }];
      expectedItems = [{
        label: 'Home',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null,
      }, {
        label: 'Group',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null,
      }, {
        label: 'Members',
        href: '/group/:groupId/members',
        clickable: false,
        hidden: false,
        backLinkHref: null,
      }];
      const result = BreadcrumbsBuilder.buildWithProps(props);
      expect(result).to.be.eql(expectedItems);
    });

    it('with labels that are functions', () => {
      props.params = {
        groupId: '10',
      };
      props.routes = [{
        path: 'group/:groupId',
        breadcrumbLabels: ({ params: { groupId } }) => `Group ${groupId}`,
      }, {
        path: 'members',
        breadcrumbLabels: () => 'Members',
      }];
      expectedItems = [{
        label: 'Group 10',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null,
      }, {
        label: 'Members',
        href: '/group/:groupId/members',
        clickable: false,
        hidden: false,
        backLinkHref: null,
      }];
      const result = BreadcrumbsBuilder.buildWithProps(props);
      expect(result).to.be.eql(expectedItems);
    });

    it('with labels of mixed types containing a full object definition', () => {
      props.params = {
        groupId: '10',
      };
      props.routes = [{
        path: 'group/:groupId',
        breadcrumbLabels: 'Group',
      }, {
        path: 'members/edit',
        breadcrumbLabels: () => [{
          label: 'Members',
          href: '/group/:groupId/members',
          clickable: false,
          hidden: true,
          backLinkHref: '/',
        }, 'Edit'],
      }];
      expectedItems = [{
        label: 'Group',
        href: '/group/:groupId',
        clickable: true,
        hidden: false,
        backLinkHref: null,
      }, {
        label: 'Members',
        href: '/group/:groupId/members',
        clickable: false,
        hidden: true,
        backLinkHref: '/',
      }, {
        label: 'Edit',
        href: '/group/:groupId/members/edit',
        clickable: false,
        hidden: false,
        backLinkHref: null,
      }];
      const result = BreadcrumbsBuilder.buildWithProps(props);
      expect(result).to.be.eql(expectedItems);
    });
  });
});
