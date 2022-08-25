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
      handler: 'browse.graph',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/browse/graph/head',
      handler: 'browse.headGraph',
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
