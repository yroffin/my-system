import * as _ from 'lodash';
import BrowseService from '../services/browse';

/**
 * A set of functions called "actions" for `browse`
 */

export default {
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
};
