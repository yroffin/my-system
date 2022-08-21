"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BrowseService {
    static async findAll() {
        return await strapi.service('api::module.module').find({});
    }
}
exports.default = BrowseService;
