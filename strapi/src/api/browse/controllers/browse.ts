import * as _ from 'lodash';
import BrowseService from '../services/browse';
import formidable from 'formidable';

/**
 * A set of functions called "actions" for `browse`
 */

export default {
  findAllTags: async (ctx, next) => {
    try {
      ctx.body = await BrowseService.findAllTags();
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        message: err
      }
    }
  },
  graph: async (ctx, next) => {
    try {
      ctx.body = await BrowseService.browseGraph(ctx.params.id);
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        message: err
      }
    }
  },
  graphs: async (ctx, next) => {
    try {
      if (ctx.query.head) {
        ctx.body = await BrowseService.headGraphs();
      } else {
        ctx.body = await BrowseService.browseGraphs(ctx.query.label);
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        message: err
      }
    }
  },
  upload: async (ctx, next) => {
    try {
      await next();
      ctx.body = await BrowseService.uploadGraph(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.status = 500;
      console.log(err)
      ctx.body = {
        message: err
      }
    }
  },
};
