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
}

export interface SysEdge {
    id: string;
    label: string;
    source: SysNode;
    target: SysNode;
    uid: string;
}
