import * as _ from 'lodash';

export class SysGraphService {
    static gexf(graph?: SysGraph): Array<string> {
        let xml = [];
        xml.push(`<?xml version="1.0" encoding="UTF-8"?>`);
        xml.push(`<gexf xmlns="http://gexf.net/1.2" version="1.2">`);
        xml.push(`<meta lastmodifieddate="2009-03-20">`);
        xml.push(`<creator>Gexf.net</creator>`);
        xml.push(`<description>A hello world! file</description>`);
        xml.push(`</meta>`);
        xml.push(`<graph mode="static" defaultedgetype="directed">`);
        xml.push(`<nodes>`);
        _.each(graph?.nodes, (node) => {
            let uid = node.uid;
            let label = node.label;
            let x = node.x;
            let y = node.y;
            let tag = node.tag;
            if (tag === null) {
                xml.push(`<node id="${uid}" label="${label}" x="${x}" y="${y}"  />`);
            } else {
                xml.push(`<node id="${uid}" label="${label}" x="${x}" y="${y}" tag="${tag}" />`);
            }
        });
        xml.push(`</nodes>`);
        xml.push(`<edges>`);
        _.each(graph?.edges, (edge) => {
            let uid = edge.uid;
            let label = edge.label;
            let source = edge.source.uid;
            let target = edge.target.uid;
            let tag = edge.tag;
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
}

export interface SysGraph {
    id?: string;
    label?: string;
    nodes?: SysNode[];
    edges?: SysEdge[];
}

export interface SysNode {
    id: string;
    label: string;
    x: number;
    y: number;
    size: number;
    color: string;
    uid: string;
    tag: string;
}

export interface SysEdge {
    id: string;
    label: string;
    source: SysNode;
    target: SysNode;
    uid: string;
    tag: string;
}

export interface SysTag {
    id: string;
    label: string;
    selector: string;
    style: any
}
