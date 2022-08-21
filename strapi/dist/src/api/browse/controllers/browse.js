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
            ctx.body = await browse_1.default.findAll();
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = {
                message: err
            };
        }
    },
};
