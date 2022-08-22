"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
class BrowseService {
    static async findAll() {
        return await strapi.service('api::module.module').find({});
    }
    static async browseGraph(graphLabel) {
        let graphs = await strapi.service('api::graph.graph').find({
            label: graphLabel, populate: {
                nodes: true,
                edges: true
            }
        });
        let result = await Promise.all(_.map(graphs.results, async (graph) => {
            graph.nodes = await Promise.all(_.map(graph.nodes, async (node) => {
                let _node = await strapi.service('api::node.node').findOne(node.id, {
                    populate: {}
                });
                return _node;
            }));
            graph.edges = await Promise.all(_.map(graph.edges, async (edge) => {
                let _edge = await strapi.service('api::edge.edge').findOne(edge.id, {
                    populate: {
                        source: true,
                        target: true
                    }
                });
                return _edge;
            }));
            return graph;
        }));
        return {
            results: result
        };
    }
}
exports.default = BrowseService;
