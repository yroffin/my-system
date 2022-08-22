export default [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '1mb',
      formLimit: '1mb',
      textLimit: '1mb',
      encoding: 'gbk',
    }
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
