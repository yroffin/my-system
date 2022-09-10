import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { SysEdge, SysGraph, SysNode, SysTag } from '../models/graph';
import { DatabaseService } from './database.service';
import { Parser } from 'xml2js';
import { keys } from 'lodash';
const parser = new Parser();

@Injectable({ providedIn: 'root' })
export class GraphService {
    constructor(private databaseService: DatabaseService) { }

    getGraphs(_filter: string): Array<SysGraph> {
        let graphs = this.databaseService.findAllGraphs()
        let result: Array<SysGraph> = new Array<SysGraph>()
        _.each(graphs, (graph) => {
            result.push(graph)
        })
        return result
    }

    getGraph(id: string): SysGraph | undefined {
        return this.databaseService.findGraph(id)
    }

    saveGraph(_graph: SysGraph): void {
        this.databaseService.storeGraph(_graph)
    }

    getAllTags(): Array<SysTag> {
        return this.databaseService.findAllTags()
    }

    saveTags(_tags: Array<SysTag>): void {
        this.databaseService.storeTags(_tags)
    }

    toGexf(graph?: SysGraph): Array<string> {
        let xml = [];
        xml.push(`<?xml version="1.0" encoding="UTF-8"?>`);
        xml.push(`<gexf xmlns="http://gexf.net/1.2" version="1.2">`);
        xml.push(`<meta lastmodifieddate="2009-03-20">`);
        xml.push(`<creator>Gexf.net</creator>`);
        xml.push(`<description>A hello world! file</description>`);
        xml.push(`</meta>`);
        xml.push(`<graph mode="static" defaultedgetype="directed">`);
        xml.push(`<nodes>`);
        _.each(_.sortBy(graph?.nodes, (node) => node.id), (node) => {
            let uid = node.id;
            let label = node.label;
            let x = node.x;
            let y = node.y;
            let tag = node.tag === undefined ? null : node.tag;
            if (tag === null) {
                xml.push(`<node id="${uid}" label="${label}" x="${x}" y="${y}"  />`);
            } else {
                xml.push(`<node id="${uid}" label="${label}" x="${x}" y="${y}" tag="${tag}" />`);
            }
        });
        xml.push(`</nodes>`);
        xml.push(`<edges>`);
        _.each(_.sortBy(graph?.edges, (edge) => edge.id), (edge) => {
            let uid = edge.id;
            let label = edge.label;
            let source = edge.source;
            let target = edge.target;
            let tag = edge.tag === undefined ? null : edge.tag;
            if (tag === null) {
                xml.push(`<edge id="${uid}" source="${source}" target="${target}" label="${label}" />`);
            } else {
                xml.push(`<edge id="${uid}" source="${source}" target="${target}" label="${label}" tag="${tag}" />`);
            }
        });
        xml.push(`</edges>`);
        xml.push(`</graph>`);
        xml.push(`</gexf>`);
        return xml;
    }

    async loadGraphGexf(id: string, label: string, data: string): Promise<SysGraph> {
        return new Promise<SysGraph>((resolve) => {
            parser.parseString(data, (err, result) => {
                if (err) {
                    throw err;
                }
                let graph: SysGraph = {
                    id: id,
                    label: label,
                    nodes: [],
                    edges: []
                }
                _.each(result.gexf.graph, (item) => {
                    _.each(item.nodes, (nodesHolder) => {
                        _.each(nodesHolder.node, (node) => {
                            let _node = node['$']
                            _node.x = parseFloat(_node.x)
                            _node.y = parseFloat(_node.y)
                            graph.nodes.push(_node);
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

    private extractMlData(node: any, field: string) {
        let key = _.find(node.data, (data) => {
            if (data['$'].key === field) return data
        })
        if (key) return key["_"]
        else return 0
    }

    async loadGraphMl(id: string, label: string, data: string): Promise<SysGraph> {
        console.debug(`loadGraphMl: ${id}`)
        return new Promise<SysGraph>((resolve) => {
            parser.parseString(data, (err, result) => {
                if (err) {
                    throw err;
                }
                let graph: SysGraph = {
                    id: id,
                    label: label,
                    nodes: [],
                    edges: []
                }
                console.log(result)
                let keys: any = []
                _.each(result.graphml.graph.key, (key) => {
                    keys.push({
                        label: key.id,
                        type: key['attr.type']
                    })
                })
                _.each(result.graphml.graph, (item) => {
                    _.each(item.node, (node) => {
                        let _node: SysNode | any = {
                            id: node['$'].id,
                            label: this.extractMlData(node, "tooltip"),
                            x: parseFloat(this.extractMlData(node, "x")),
                            y: parseFloat(this.extractMlData(node, "y")),
                        }
                        graph.nodes.push(_node);
                    });
                    _.each(item.edge, (edge) => {
                        let _edge: SysEdge = {
                            id: edge['$'].id,
                            label: "default",
                            source: edge['$'].source,
                            target: edge['$'].target,
                        }
                        graph.edges.push(_edge);
                    });
                })
                resolve(graph);
            })
        })
    }
}
