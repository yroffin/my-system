import * as _ from 'lodash';

export interface SysGraph {
    id: string;
    location: string;
    label: string;
    style: string;
    rules: string;
    nodes: SysNode[];
    edges: SysEdge[];
}

export interface SysNode {
    id: string;
    location: string;
    parent?: string;
    label: string;
    alias?: string;
    cdata?: string;
    group?: string;
    x: number;
    y: number;
    size?: number;
    color?: string;
    tag?: string;
}

export interface SysEdge {
    id: string;
    location: string;
    label: string;
    cdata?: string;
    source: string;
    target: string;
    tag?: string;
}


