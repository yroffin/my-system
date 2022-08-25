import * as _ from 'lodash';

import xml2js from 'xml2js';
const parser = new xml2js.Parser();

/**
 * browse service.
 */

import { CollectionTypeService } from '@strapi/strapi/lib/core-api/service';
import { SysGraph } from '../models/graph';

export default class BrowseService {
    public static async findAll(): Promise<any> {
        return await strapi.service<CollectionTypeService>('api::module.module').find({});
    }

    public static async findAllTags(): Promise<any> {
        let tags: any = await strapi.service<CollectionTypeService>('api::tag.tag').find({
            populate: {
                style: true,
            }
        });
        return tags.results
    }

    public static async headGraph(): Promise<any> {
        let graphs: any = await strapi.service<CollectionTypeService>('api::graph.graph').find({
        });
        return graphs.results
    }

    public static async browseGraph(graphLabel: string): Promise<any> {
        strapi.log.debug(`browseGraph: ${graphLabel}`)
        let graphs: any = await strapi.service<CollectionTypeService>('api::graph.graph').find({
            label: graphLabel, populate: {
                nodes: true,
                edges: true
            }
        });
        strapi.log.debug(`browseGraph: ${graphs}`)
        let result = await Promise.all(_.map(graphs.results, async (graph: any) => {
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
        return result
    }

    public static async loadGraph(graphLabel: string, data: string): Promise<any> {
        strapi.log.debug(`loadGraph (delete/create): ${graphLabel}`)
        let graph: SysGraph = undefined
        try {
            graph = await BrowseService.loadGraphGexf(graphLabel, data);
        } catch (err) {
            strapi.log.error(`loadGraph: ${err}`)
            throw err
        }
        let current = await BrowseService.browseGraph(graphLabel);
        let deleted = await Promise.all(_.map(current, async (graph) => {
            strapi.log.debug(`loadGraph: remove graph ${graph.id}`)
            let deleted = await strapi.entityService.delete('api::graph.graph', graph.id);
            await Promise.all(_.map(graph.nodes, async (node) => {
                strapi.log.debug(`loadGraph: remove node ${node.id}`)
                await strapi.entityService.delete('api::node.node', node.id);
            }))
            await Promise.all(_.map(graph.edges, async (edge) => {
                strapi.log.debug(`loadGraph: remove edge ${edge.id}`)
                await strapi.entityService.delete('api::edge.edge', edge.id);
            }))
            return deleted
        }))
        const newGraph = await strapi.entityService.create('api::graph.graph', {
            data: {
                label: graph.label
            }
        });
        strapi.log.debug(`loadGraph: create graph ${newGraph.id}`)
        let allNodes = {
        }
        let promisedNodes = await Promise.all(_.map(graph.nodes, async (node) => {
            const newNode = await strapi.entityService.create('api::node.node', {
                data: {
                    uid: node.id,
                    label: node.label,
                    x: node.x,
                    y: node.y,
                    graphs: newGraph.id
                }
            });
            allNodes[node.id] = newNode.id;
            strapi.log.debug(`loadGraph: create node ${newNode.id}`)
            return newNode
        }));
        let PromisedEdges = await Promise.all(_.map(graph.edges, async (edge) => {
            const newEdge = await strapi.entityService.create('api::edge.edge', {
                data: {
                    uid: edge.id,
                    label: edge.label,
                    graphs: newGraph.id,
                    source: allNodes[edge.source],
                    target: allNodes[edge.target]
                },
            });
            strapi.log.debug(`loadGraph: create edge ${newEdge.id}`)
            return newEdge
        }));
        return {}
    }

    private static async loadGraphGexf(graphLabel: string, data: string): Promise<SysGraph> {
        strapi.log.debug(`loadGraphGexf: ${graphLabel}`)
        return new Promise<SysGraph>((resolve) => {
            parser.parseString(data, (err, result) => {
                if (err) {
                    throw err;
                }
                let graph: SysGraph = {
                    id: 'default',
                    label: graphLabel,
                    nodes: [],
                    edges: []
                }
                _.each(result.gexf.graph, (item) => {
                    _.each(item.nodes, (nodesHolder) => {
                        _.each(nodesHolder.node, (node) => {
                            graph.nodes.push(node['$']);
                        });
                    });
                    _.each(item.edges, (edgesHolder) => {
                        _.each(edgesHolder.edge, (edge) => {
                            graph.edges.push(edge['$']);
                        });
                    });
                })
                resolve(graph);
            })
        })
    }
}