import * as _ from 'lodash';

/**
 * browse service.
 */

import { CollectionTypeService } from '@strapi/strapi/lib/core-api/service';

export default class BrowseService {
    public static async findAll(): Promise<any> {
        return await strapi.service<CollectionTypeService>('api::module.module').find({});
    }
}