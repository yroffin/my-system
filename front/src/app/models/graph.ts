import * as _ from 'lodash';

export interface SysGraph {
    id: string;
    label: string;
    nodes: SysNode[];
    edges: SysEdge[];
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
    source: string;
    target: string;
    uid: string;
    tag?: string;
}

export interface SysTag {
    id: string;
    label: string;
    selector: string;
    style: any
}
