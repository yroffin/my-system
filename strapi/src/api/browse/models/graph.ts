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
    tag: string;
}

export interface SysEdge {
    id: string;
    label: string;
    source: string;
    target: string;
    tag: string;
}