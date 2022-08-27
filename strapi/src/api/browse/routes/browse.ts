export default {
  routes: [
    {
      method: 'GET',
      path: '/browse/tags',
      handler: 'browse.findAllTags',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/browse/graph',
      handler: 'browse.graphs',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/browse/graph/:id',
      handler: 'browse.graph',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/browse/graph/:id',
      handler: 'browse.upload',
    }
  ],
};
