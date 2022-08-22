"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browse_1 = __importDefault(require("../services/browse"));
/**
 * A set of functions called "actions" for `browse`
 */
exports.default = {
    graph: async (ctx, next) => {
        try {
            ctx.body = await browse_1.default.browseGraph(ctx.query.label);
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = {
                message: err
            };
        }
    },
    load: async (ctx, next) => {
        try {
            await next();
            ctx.body = await browse_1.default.loadGraph(ctx.query.label, ctx.request.body);
        }
        catch (err) {
            ctx.status = 500;
            console.log(err);
            ctx.body = {
                message: err
            };
        }
    },
};
