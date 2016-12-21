import React from 'react';

import { shallow } from 'enzyme';
import { expect } from 'chai';
import Breadcrumbs from 'components/Breadcrumbs';
import RouteBreadcrumbs from './';

// <Breadcrumbs state params location routes buildRoute>

describe('<RouteBreadcrumbs />', () => {
  const props = {
    params: undefined,
    location: undefined,
    routes: undefined,
    buildRoute: undefined,
  };
  let mounted;
  let expectedItems;

  beforeEach(() => {
    props.params = {};
    props.location = {};
    props.routes = [];
    props.buildRoute = (path) => `/${path}`;
    mounted = undefined;
    expectedItems = undefined;
  });

  context('breadcrumb rendering', () => {
    it('null when there are no labelled route segments', () => {
      props.routes = [{
        path: '/group/1',
      }];
      mounted = shallow(<RouteBreadcrumbs {...props} />);
      expect(mounted).to.not.have.descendants(Breadcrumbs);
    });

    it('with one item when there is one labelled route segment', () => {
      props.routes = [{
        path: 'group/:groupId',
        breadcrumbLabels: 'Group',
      }];
      expectedItems = [{
        label: 'Group',
        href: '/group/:groupId',
        clickable: true,
      }];
      mounted = shallow(<RouteBreadcrumbs {...props} />);
      expect(mounted).to.contain(<Breadcrumbs items={expectedItems} />);
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
      }, {
        label: 'Members',
        href: '/group/:groupId/dashboard/members',
        clickable: false,
      }];
      mounted = shallow(<RouteBreadcrumbs {...props} />);
      expect(mounted).to.contain(<Breadcrumbs items={expectedItems} />);
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
      }, {
        label: 'Group',
        href: '/group/:groupId',
        clickable: true,
      }, {
        label: 'Members',
        href: '/group/:groupId/members',
        clickable: false,
      }];
      mounted = shallow(<RouteBreadcrumbs {...props} />);
      expect(mounted).to.contain(<Breadcrumbs items={expectedItems} />);
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
      }, {
        label: 'Members',
        href: '/group/:groupId/members',
        clickable: false,
      }];
      mounted = shallow(<RouteBreadcrumbs {...props} />);
      expect(mounted).to.contain(<Breadcrumbs items={expectedItems} />);
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
        }, 'Edit'],
      }];
      expectedItems = [{
        label: 'Group',
        href: '/group/:groupId',
        clickable: true,
      }, {
        label: 'Members',
        href: '/group/:groupId/members',
        clickable: false,
      }, {
        label: 'Edit',
        href: '/group/:groupId/members/edit',
        clickable: false,
      }];
      mounted = shallow(<RouteBreadcrumbs {...props} />);
      expect(mounted).to.contain(<Breadcrumbs items={expectedItems} />);
    });
  });
});
