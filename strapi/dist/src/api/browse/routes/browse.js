"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/browse/graph',
            handler: 'browse.graph',
            config: {
                policies: [],
                middlewares: [],
            },
        }
    ],
};
