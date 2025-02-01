import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { SysEdge, SysGraph, SysNode } from '../models/graph';
import { Parser } from 'xml2js';
import { NGXLogger } from 'ngx-logger';
import { Base16Service } from './base16.service';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'ngx-webstorage';
import { DatabaseEntity } from './database-entity.service';
const parser = new Parser();

@Injectable({
    providedIn: 'root'
})
export class GraphService extends DatabaseEntity<SysGraph> {


    constructor(
        private _logger: NGXLogger,
        private _storage: LocalStorageService,
        private base16: Base16Service,
        private messageService: MessageService
    ) {
        super()
        this.init("graphs", this._storage, this._logger)
    }

    private outputNodes(graph: SysGraph | undefined): any[] {
        return _.map(_.sortBy(graph?.nodes, (node) => node.id), (node) => {
            let output: any = {
                uid: this.base16.decode(node.id),
                label: node.label,
                x: node.x,
                y: node.y,
                group: node.group === undefined ? null : node.group,
                tag: node.tag === undefined ? null : node.tag,
            }
            if (node.parent) {
                output.parent = this.base16.decode(node.parent)
            }
            if (node.cdata) {
                output.cdata = node.cdata
            }
            if (node.alias) {
                output.alias = node.alias
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


    // Build a unniq instance of each edge key
    private computeInstance(hash: any, key: string): any {
        if (hash[key]) {
            hash[key].count++
        } else {
            hash[key] = {
                count: 1
            }
        }
        return hash[key]
    }

    // Build a unniq instance of each edge key
    // Ignore 0 index
    buildId(hash: any, edge: any): string {
        let uniqInstance = this.computeInstance(hash, `${edge.source}:${edge.target}`)
        let labelInstance = ""
        if (uniqInstance.count > 1) {
            labelInstance = `@${uniqInstance.count - 1}`
        }
        return `${edge.source}:${edge.target}${labelInstance}`
    }

    toGexf(graph?: SysGraph): Array<string> {
        this._logger.info("toGexf", graph)
        let xml = [];
        xml.push(`<?xml version="1.0" encoding="UTF-8"?>`);
        xml.push(`<gexf xmlns="http://gexf.net/1.2" version="1.2">`);
        xml.push(`<meta lastmodifieddate="2009-03-20">`);
        xml.push(`<creator>Gexf.net</creator>`);
        xml.push(`<description>A hello world! file</description>`);
        xml.push(`</meta>`);
        xml.push(`<graph mode="static" defaultedgetype="directed" style="${graph?.style}" rules="${graph?.rules}">`);
        xml.push(`<nodes>`);
        _.each(_.sortBy(this.outputNodes(graph), "uid"), (node) => {
            let endtag = ` />`
            if (node.cdata) {
                endtag = `>`
            }
            // Alias
            if (node.alias === undefined || node.alias === null) {
                node.alias = ""
            }
            if (node.tag === null) {
                if (node.parent) {
                    xml.push(`<node id="${node.uid}" parent="${parent}" label="${node.label}" alias="${node.alias}" group="${node.group}" x="${node.x}" y="${node.y}"${endtag}`);
                } else {
                    xml.push(`<node id="${node.uid}" label="${node.label}" alias="${node.alias}" group="${node.group}" x="${node.x}" y="${node.y}"${endtag}`);
                }
            } else {
                if (node.parent) {
                    xml.push(`<node id="${node.uid}" parent="${node.parent}" label="${node.label}" alias="${node.alias}" group="${node.group}" x="${node.x}" y="${node.y}" tag="${node.tag}"${endtag}`);
                } else {
                    xml.push(`<node id="${node.uid}" label="${node.label}" alias="${node.alias}" group="${node.group}" x="${node.x}" y="${node.y}" tag="${node.tag}"${endtag}`);
                }
            }
            if (node.cdata) {
                xml.push(`<![CDATA[${node.cdata}]]>`);
                xml.push(`</node>`);
            }
        });
        xml.push(`</nodes>`);
        xml.push(`<edges>`);
        let sorted = _.map(this.outputEdges(graph), (edge) => {
            edge.uid = `${edge.source}:${edge.target}`
            return edge
        })
        let dict: any = {}
        _.each(_.sortBy(sorted, "uid"), (edge) => {
            let endtag = ` />`
            if (edge.cdata) {
                endtag = `>`
            }
            if (edge.tag === null) {
                xml.push(`<edge id="${this.buildId(dict, edge)}" source="${edge.source}" target="${edge.target}" label="${edge.label}"${endtag}`);
            } else {
                xml.push(`<edge id="${this.buildId(dict, edge)}" source="${edge.source}" target="${edge.target}" label="${edge.label}" tag="${edge.tag}"${endtag}`);
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
        xml.push(`<graph id="G" edgedefault="undirected" style="${graph?.style}">`);
        _.each(this.outputNodes(graph), (node) => {
            let endtag = ` />`
            if (node.cdata) {
                endtag = `>`
            }
            if (node.tag === null) {
                if (node.parent) {
                    xml.push(`<node id="${node.uid}" parent="${parent}" label="${node.label}" group="${node.group}" x="${node.x}" y="${node.y}"${endtag}`);
                } else {
                    xml.push(`<node id="${node.uid}" label="${node.label}" group="${node.group}" x="${node.x}" y="${node.y}"${endtag}`);
                }
            } else {
                if (node.parent) {
                    xml.push(`<node id="${node.uid}" parent="${node.parent}" label="${node.label}" group="${node.group}" x="${node.x}" y="${node.y}" tag="${node.tag}"${endtag}`);
                } else {
                    xml.push(`<node id="${node.uid}" label="${node.label}" group="${node.group}" x="${node.x}" y="${node.y}" tag="${node.tag}"${endtag}`);
                }
            }
            if (node.cdata) {
                xml.push(`<![CDATA[${node.cdata}]]>`);
                xml.push(`</node>`);
            }
        });
        let dict: any = {}
        _.each(this.outputEdges(graph), (edge) => {
            let endtag = ` />`
            if (edge.cdata) {
                endtag = `>`
            }
            if (edge.tag === null) {
                xml.push(`<edge id="${this.buildId(dict, edge)}" source="${edge.source}" target="${edge.target}" label="${edge.label}"${endtag}`);
            } else {
                xml.push(`<edge id="${this.buildId(dict, edge)}" source="${edge.source}" target="${edge.target}" label="${edge.label}" tag="${edge.tag}"${endtag}`);
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
        this._logger.info(`loadGraphGexf: ${id}`)
        return new Promise<SysGraph>((resolve) => {
            parser.parseString(data, (err, result) => {
                if (err) {
                    this._logger.error(err)
                    throw err;
                }
                let graph: SysGraph = {
                    id: id,
                    style: "default",
                    rules: "default",
                    label: label,
                    nodes: [],
                    edges: []
                }
                _.each(result.gexf.graph, (item) => {
                    // Read style
                    graph.style = item['$'].style
                    graph.rules = item['$'].rules
                    let index: any = {}
                    this._logger.info("loading nodes", item.nodes)
                    _.each(item.nodes, (nodesHolder) => {
                        _.each(nodesHolder.node, (node) => {
                            let _node: any = {
                                id: this.base16.encode(node['$'].id),
                                x: parseFloat(node['$'].x),
                                y: parseFloat(node['$'].y),
                                // delete first \n and last \n
                                cdata: this.filterCDATA(node['_']),
                                // Alias
                                alias: node['$'].alias ? node['$'].alias : "",
                                label: node['$'].label ? node['$'].label : "",
                                group: node['$'].group ? node['$'].group : "",
                                tag: node['$'].tag ? node['$'].tag : ""
                            }
                            // store id in index
                            index[_node.id] = true
                            // Decode parent property
                            if (node['$'].parent) {
                                _node.parent = this.base16.encode(node['$'].parent)
                            }
                            graph.nodes.push(_node);
                        });
                    });
                    this._logger.info("loading edges", item.edges)
                    _.each(item.edges, (edgesHolder) => {
                        _.each(edgesHolder.edge, (edge) => {
                            let _edge: any = {
                                id: this.base16.encode(edge['$'].id),
                                source: this.base16.encode(edge['$'].source),
                                target: this.base16.encode(edge['$'].target),
                                cdata: this.filterCDATA(edge['_']),
                                label: edge['$'].label ? edge['$'].label : "",
                                tag: edge['$'].tag ? edge['$'].tag : ""
                            }
                            if (!index[_edge.source]) {
                                this._logger.error("source unkown", edge['$'])
                                throw new Error(`source unkown ${edge['$'].source}`)
                            }
                            if (!index[_edge.target]) {
                                this._logger.error("target unkown", edge['$'])
                                throw new Error(`target unkown ${edge['$'].target}`)
                            }
                            graph.edges.push(_edge);
                        });
                    });
                })
                this._logger.info(graph)
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
        this._logger.info(`loadGraphMl: ${id}`)
        return new Promise<SysGraph>((resolve) => {
            parser.parseString(data, (err, result) => {
                if (err) {
                    throw err;
                }
                let graph: SysGraph = {
                    id: id,
                    style: "default",
                    rules: "default",
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
            let reader = new FileReader();
            reader.addEventListener("loadend", async () => {
                let data: String = new String(reader.result);
                let loadedGraph: SysGraph = {
                    id: id,
                    style: "default",
                    rules: "default",
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
