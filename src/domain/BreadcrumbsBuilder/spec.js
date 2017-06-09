import BreadcrumbsBuilder from './';

// <Breadcrumbs state params location routes buildRoute>

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

test('when there are no labelled route segments', () => {
  props.routes = [{
    path: '/group/1',
  }];
  const result = BreadcrumbsBuilder.buildWithProps(props);
  expect(result).toEqual([]);
});

test('when there is one labelled route segment', () => {
  props.routes = [{
    path: 'group/:groupId',
    breadcrumbLabels: 'Group',
  }];
  expectedItems = [{
    label: 'Group',
    href: '/group/:groupId',
    clickable: true,
    backLinkHref: null,
  }];
  const result = BreadcrumbsBuilder.buildWithProps(props);
  expect(result).toEqual(expectedItems);
});

test('with two items when there are two labelled route segments', () => {
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
    backLinkHref: null,
  }, {
    label: 'Members',
    href: '/group/:groupId/dashboard/members',
    clickable: false,
    backLinkHref: null,
  }];
  const result = BreadcrumbsBuilder.buildWithProps(props);
  expect(result).toEqual(expectedItems);
});

test('with more labels than routes when label value(s) are arrays', () => {
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
    backLinkHref: null,
  }, {
    label: 'Group',
    href: '/group/:groupId',
    clickable: true,
    backLinkHref: null,
  }, {
    label: 'Members',
    href: '/group/:groupId/members',
    clickable: false,
    backLinkHref: null,
  }];
  const result = BreadcrumbsBuilder.buildWithProps(props);
  expect(result).toEqual(expectedItems);
});

test('with labels that are functions', () => {
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
    backLinkHref: null,
  }, {
    label: 'Members',
    href: '/group/:groupId/members',
    clickable: false,
    backLinkHref: null,
  }];
  const result = BreadcrumbsBuilder.buildWithProps(props);
  expect(result).toEqual(expectedItems);
});

test('with labels of mixed types containing a full object definition', () => {
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
      backLinkHref: '/',
    }, 'Edit'],
  }];
  expectedItems = [{
    label: 'Group',
    href: '/group/:groupId',
    clickable: true,
    backLinkHref: null,
  }, {
    label: 'Members',
    href: '/group/:groupId/members',
    clickable: false,
    backLinkHref: '/',
  }, {
    label: 'Edit',
    href: '/group/:groupId/members/edit',
    clickable: false,
    backLinkHref: null,
  }];
  const result = BreadcrumbsBuilder.buildWithProps(props);
  expect(result).toEqual(expectedItems);
});
