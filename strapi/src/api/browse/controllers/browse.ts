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
      ctx.body = await BrowseService.browseGraph(ctx.query.label);
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        message: err
      }
    }
  },
  headGraph: async (ctx, next) => {
    try {
      ctx.body = await BrowseService.headGraph();
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        message: err
      }
    }
  },
  load: async (ctx, next) => {
    try {
      await next();
      ctx.body = await BrowseService.loadGraph(ctx.query.label, ctx.request.body);
    } catch (err) {
      ctx.status = 500;
      console.log(err)
      ctx.body = {
        message: err
      }
    }
  },
};
