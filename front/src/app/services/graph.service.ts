import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { SysEdge, SysGraph, SysNode, SysTag } from '../models/graph';
import { DatabaseService } from './database.service';
import { Parser } from 'xml2js';
import { NGXLogger } from 'ngx-logger';
import { Base16Service } from './base16.service';
import { MessageService } from 'primeng/api';
import { _INITIAL_REDUCERS } from '@ngrx/store/src/tokens';
const parser = new Parser();

@Injectable({ providedIn: 'root' })
export class GraphService {
    constructor(
        private messageService: MessageService,
        private databaseService: DatabaseService,
        private base16: Base16Service,
        private logger: NGXLogger
    ) { }

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

    private outputNodes(graph: SysGraph | undefined): any[] {
        return _.map(_.sortBy(graph?.nodes, (node) => node.id), (node) => {
            let output: any = {
                uid: this.base16.decode(node.id),
                label: node.label,
                x: node.x,
                y: node.y,
                tag: node.tag === undefined ? null : node.tag,
            }
            if (node.parent) {
                output.parent = this.base16.decode(node.parent)
            }
            if (node.cdata) {
                output.cdata = node.cdata
            }
            return output
        })
    }

    private outputEdges(graph: SysGraph | undefined): any[] {
        return _.map(_.sortBy(graph?.edges, (edge) => edge.id), (edge) => {
            let output: any = {
                uid: this.base16.decode(edge.id),
                label: edge.label,
                source: this.base16.decode(edge.source),
                target: this.base16.decode(edge.target),
                tag: edge.tag === undefined ? null : edge.tag
            }
            if (edge.cdata) {
                output.cdata = edge.cdata
            }
            return output
        })
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
        _.each(this.outputNodes(graph), (node) => {
            let endtag = ` />`
            if (node.cdata) {
                endtag = `>`
            }
            if (node.tag === null) {
                if (node.parent) {
                    xml.push(`<node id="${node.uid}" parent="${parent}" label="${node.label}" x="${node.x}" y="${node.y}"${endtag}`);
                } else {
                    xml.push(`<node id="${node.uid}" label="${node.label}" x="${node.x}" y="${node.y}"${endtag}`);
                }
            } else {
                if (node.parent) {
                    xml.push(`<node id="${node.uid}" parent="${node.parent}" label="${node.label}" x="${node.x}" y="${node.y}" tag="${node.tag}"${endtag}`);
                } else {
                    xml.push(`<node id="${node.uid}" label="${node.label}" x="${node.x}" y="${node.y}" tag="${node.tag}"${endtag}`);
                }
            }
            if (node.cdata) {
                xml.push(`<![CDATA[${node.cdata}]]>`);
                xml.push(`</node>`);
            }
        });
        xml.push(`</nodes>`);
        xml.push(`<edges>`);
        _.each(this.outputEdges(graph), (edge) => {
            let endtag = ` />`
            if (edge.cdata) {
                endtag = `>`
            }
            if (edge.tag === null) {
                xml.push(`<edge id="${edge.uid}" source="${edge.source}" target="${edge.target}" label="${edge.label}"${endtag}`);
            } else {
                xml.push(`<edge id="${edge.uid}" source="${edge.source}" target="${edge.target}" label="${edge.label}" tag="${edge.tag}"${endtag}`);
            }
            if (edge.cdata) {
                xml.push(`<![CDATA[${edge.cdata}]]>`);
                xml.push(`</edge>`);
            }
        });
        xml.push(`</edges>`);
        xml.push(`</graph>`);
        xml.push(`</gexf>`);
        return xml;
    }

    toGraphml(graph?: SysGraph): Array<string> {
        let xml = [];
        xml.push(`<?xml version="1.0" encoding="UTF-8"?>`);
        xml.push(`<graphml xmlns="http://graphml.graphdrawing.org/xmlns" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">`);
        xml.push(`<graph id="G" edgedefault="undirected">`);
        _.each(this.outputNodes(graph), (node) => {
            let endtag = ` />`
            if (node.cdata) {
                endtag = `>`
            }
            if (node.tag === null) {
                if (node.parent) {
                    xml.push(`<node id="${node.uid}" parent="${parent}" label="${node.label}" x="${node.x}" y="${node.y}"${endtag}`);
                } else {
                    xml.push(`<node id="${node.uid}" label="${node.label}" x="${node.x}" y="${node.y}"${endtag}`);
                }
            } else {
                if (node.parent) {
                    xml.push(`<node id="${node.uid}" parent="${node.parent}" label="${node.label}" x="${node.x}" y="${node.y}" tag="${node.tag}"${endtag}`);
                } else {
                    xml.push(`<node id="${node.uid}" label="${node.label}" x="${node.x}" y="${node.y}" tag="${node.tag}"${endtag}`);
                }
            }
            if (node.cdata) {
                xml.push(`<![CDATA[${node.cdata}]]>`);
                xml.push(`</node>`);
            }
        });
        _.each(this.outputEdges(graph), (edge) => {
            let endtag = ` />`
            if (edge.cdata) {
                endtag = `>`
            }
            if (edge.tag === null) {
                xml.push(`<edge id="${edge.uid}" source="${edge.source}" target="${edge.target}" label="${edge.label}"${endtag}`);
            } else {
                xml.push(`<edge id="${edge.uid}" source="${edge.source}" target="${edge.target}" label="${edge.label}" tag="${edge.tag}"${endtag}`);
            }
            if (edge.cdata) {
                xml.push(`<![CDATA[${edge.cdata}]]>`);
                xml.push(`</edge>`);
            }
        });
        xml.push(`</graph>`);
        xml.push(`</graphml>`);
        return xml;
    }

    private filterCDATA(cdata: string): string | undefined {
        if (cdata) {
            let result = ""
            for (let index = 1; index < cdata.length - 1; index++) {
                result += cdata.charAt(index)
            }
            return result
        } else {
            return undefined
        }
    }

    async loadGraphGexf(id: string, label: string, data: string): Promise<SysGraph> {
        return new Promise<SysGraph>((resolve) => {
            parser.parseString(data, (err, result) => {
                if (err) {
                    this.logger.log(err)
                    throw err;
                }
                let graph: SysGraph = {
                    id: id,
                    label: label,
                    nodes: [],
                    edges: []
                }
                _.each(result.gexf.graph, (item) => {
                    let index: any = {}
                    _.each(item.nodes, (nodesHolder) => {
                        _.each(nodesHolder.node, (node) => {
                            let _node = node['$']
                            _node.id = this.base16.encode(_node.id)
                            // store id in index
                            index[_node.id] = true
                            _node.x = parseFloat(_node.x)
                            _node.y = parseFloat(_node.y)
                            // delete first \n and last \n
                            _node.cdata = this.filterCDATA(node['_'])
                            // Decode parent property
                            if (_node.parent) {
                                _node.parent = this.base16.encode(_node.parent)
                            }
                            graph.nodes.push(_node);
                        });
                    });
                    _.each(item.edges, (edgesHolder) => {
                        _.each(edgesHolder.edge, (edge) => {
                            let _edge: any = {}
                            _edge.id = this.base16.encode(edge['$'].id)
                            _edge.source = this.base16.encode(edge['$'].source)
                            _edge.target = this.base16.encode(edge['$'].target)
                            if (!index[_edge.source]) {
                                this.logger.log(`source unkown ${edge['$'].source}`)
                                throw new Error(`source unkown ${edge['$'].source}`)
                            }
                            if (!index[_edge.target]) {
                                this.logger.log(`target unkown ${edge['$'].target}`)
                                throw new Error(`target unkown ${edge['$'].target}`)
                            }
                            _edge.cdata = this.filterCDATA(edge['$']['_'])
                            graph.edges.push(_edge);
                        });
                    });
                })
                this.logger.log(graph)
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
        this.logger.debug(`loadGraphMl: ${id}`)
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

    uploadHandler(file: any, id: string, label: string): Promise<SysGraph> {
        return new Promise<SysGraph>((resolve) => {
            this.logger.log(file)
            let reader = new FileReader();
            reader.addEventListener("loadend", async () => {
                let data: String = new String(reader.result);
                let loadedGraph: SysGraph = {
                    id: id,
                    label: label,
                    nodes: [],
                    edges: []
                }
                if (data.includes('xmlns="http://gexf')) {
                    this.messageService.add({
                        severity: 'info', summary: 'Info', detail: `Load GEXF file to ${label}`
                    });
                    loadedGraph = await this.loadGraphGexf(id, label, data.toString());
                }
                if (data.includes("http://graphml.graphdrawing.org")) {
                    this.messageService.add({
                        severity: 'info', summary: 'Info', detail: `Load GRAPHML file to ${label}`
                    });
                    loadedGraph = await this.loadGraphMl(id, label, data.toString());
                }
                if (loadedGraph.nodes.length == 0) {
                    this.messageService.add({
                        severity: 'warn', summary: 'warn', detail: `No node for ${label}`
                    });
                }
                resolve(loadedGraph)
            });
            reader.readAsText(file)
        })
    }
}
