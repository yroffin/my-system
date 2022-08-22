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
    },
    {
      method: 'POST',
      path: '/browse/graph',
      handler: 'browse.load',
    }
  ],
};
