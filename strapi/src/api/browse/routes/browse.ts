export default {
  routes: [
    {
      method: 'GET',
      path: '/browse/graph',
      handler: 'browse.graph',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
