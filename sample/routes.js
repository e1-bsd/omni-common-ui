import App from 'components/App';

export default {
  component: 'div',
  childRoutes: [
    {
      path: '/',
      component: App,
      childRoutes: [],
    },
  ],
};
