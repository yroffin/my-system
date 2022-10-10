import * as _ from 'lodash';

export interface SysGraph {
    id: string;
    label: string;
    nodes: SysNode[];
    edges: SysEdge[];
}

export interface SysNode {
    id: string;
    parent?: string;
    label: string;
    x: number;
    y: number;
    size?: number;
    color?: string;
    tag?: string;
}

export interface SysEdge {
    id: string;
    label: string;
    source: string;
    target: string;
    tag?: string;
}

export interface SysTag {
    id: string;
    label: string;
    selector: string;
    style: any
}
