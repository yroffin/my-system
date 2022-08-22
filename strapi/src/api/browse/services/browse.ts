import * as _ from 'lodash';

/**
 * browse service.
 */

import { CollectionTypeService } from '@strapi/strapi/lib/core-api/service';

export default class BrowseService {
    public static async findAll(): Promise<any> {
        return await strapi.service<CollectionTypeService>('api::module.module').find({});
    }

    public static async browseGraph(graphLabel: string): Promise<any> {
        let graphs: any = await strapi.service<CollectionTypeService>('api::graph.graph').find({
            label: graphLabel, populate: {
                nodes: true,
                edges: true
            }
        });
        let result = await Promise.all(_.map(graphs.results, async (graph) => {
            graph.nodes = await Promise.all(_.map(graph.nodes, async (node) => {
                let _node: any = await strapi.service<CollectionTypeService>('api::node.node').findOne(node.id, {
                    populate: {
                        tags: true,
                    }
                });
                return _node;
            }));
            graph.edges = await Promise.all(_.map(graph.edges, async (edge) => {
                let _edge: any = await strapi.service<CollectionTypeService>('api::edge.edge').findOne(edge.id, {
                    populate: {
                        tags: true,
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
        }
    }

    public static async loadGraph(graphLabel: string, data: string): Promise<any> {
        console.log(data);
        return {}
    }
}